import bcrypt from "bcrypt";
import client from "../../client";
export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, location, password, avatarURL, githubUsername }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          return { ok: false, error: "This username/email is already taken." };
        }
        const uglyPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            username,
            email,
            name,
            location,
            password: uglyPassword,
            avatarURL,
            githubUsername,
          },
        });
        return { ok: true, error: null };
      } catch (e) {
        return { ok: false, error: e.message };
      }
    },
  },
};
