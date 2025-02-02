import { prisma } from "@/constants/variables";
import { ResponseHandler } from "@/lib/responseHandler";
import crypto from 'crypto'
import moment from 'moment';


export async function POST(request: Request) {
  try {
    const body = await request.json();
    // validity the signature keys
    const { order_id, status_code, gross_amount, signature_key, transaction_status } = body;

    const serverKey = process.env.MIDTRANS_SERVER_KEY || '';

    // Generate the expected signature key
    const expectedSignature = crypto
      .createHash('sha512')
      .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
      .digest('hex');


    // if (expectedSignature !== signature_key) {
    //   console.log('Invalid signature key');
    //   return ResponseHandler.InvalidData('Invalid signature key');
    // }

    // Process the callback
    const order = await prisma.order.update({
      where: {
        id: order_id,
      },
      data: {
        status: transaction_status === 'settlement' ? 'Success' : 'Failed',
      },
      include: {
        user: true,
        orderItem: {
          include: {
            service: true
          }
        }
      }
    })

  
    const serviceIds = order.orderItem.map((item) => item.serviceId);


    const room = await prisma.room.findFirst({
      where: {
        serviceId: {
          in: serviceIds
        },
        AND: {
          RoomUser: {
            some: {
              userId: order.userId
            }
          }
        }
      }
    })

    if (transaction_status === 'settlement') {
      console.log(moment().toDate());
      if (room) {
        await prisma.room.update({
          where: {
            id: room.id,
          },
          data: {
            expiredDate: moment().add(1, 'hour').toDate(),
          }
        })
      } else {
        await prisma.room.create({
          data: {
            serviceId: serviceIds[0],
            lastMessage: '',
            expiredDate: moment().add(1, 'hour').toDate(),
            RoomUser: {
              create: [
                {
                  userId: order.userId
                },
                {
                  userId: order.orderItem[0].service.dokterId
                }
              ]
            }
          }
        })
      }

    }

    return ResponseHandler.get({ message: 'Callback received successfully' });
  } catch (error) {
    console.log((error as Error)?.message);
    return ResponseHandler.serverError((error as Error)?.message);
  }

}