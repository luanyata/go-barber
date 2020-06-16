import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import { ObjectID } from 'mongodb';
import INotificationsRepository from '../INotificationsRepository';
import Notification from '../../infra/typeorm/schemas/Notification';

class FakeNotificationRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipientId,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), content, recipientId });

    this.notifications.push(notification);

    return notification;
  }
}

export default FakeNotificationRepository;
