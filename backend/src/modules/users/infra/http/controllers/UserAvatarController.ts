import { Request, Response } from "express";
import { container } from "tsyringe";
import UpdateAvatarUserService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvaterController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateAvatarUserService);

    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      fileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}
