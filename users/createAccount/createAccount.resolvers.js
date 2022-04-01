import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      {
        firstName,
        lastName,
        username,
        email,
        password,
        location,
        githubUsername,
        avatarURL,
      }
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
          throw Error("Username/Email already taken 😅"); // throw error message
        }

        const uglyPassword = await bcrypt.hash(password, 10);
        const createAccount = await client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
            location,
            githubUsername,
            avatarURL,
          },
        });
        // return CreateAccountResult to ok and error
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};
