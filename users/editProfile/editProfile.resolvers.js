import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../user.utils";
export default {
  Mutation: {
    editProfile: protectedResolver(
      //Closure
      async (
        _,
        {
          username,
          email,
          name,
          location,
          password: newPassword,
          avatarURL,
          githubUsername,
        },
        { loggedInUser }
      ) => {
        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }
        const ok = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            username,
            email,
            name,
            location,
            ...(uglyPassword && { password: uglyPassword }),
            avatarURL,
            githubUsername,
          },
        });
        if (ok) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update profile.",
          };
        }
      }
      //Closure End
    ),
  },
};
