import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../user.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          firstName,
          lastName,
          username,
          email,
          location,
          avatarURL,
          githubUsername,
          password: newPassword,
        },
        { loggedInUser, protectorResolver }
      ) => {
        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }
        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            firstName,
            lastName,
            username,
            email,
            location,
            avatarURL,
            githubUsername,
            ...(uglyPassword && { password: uglyPassword }),
          },
        });
        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Password can no change",
          };
        }
      }
    ),
  },
};
