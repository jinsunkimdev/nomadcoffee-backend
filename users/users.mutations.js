import bcrypt from "bcrypt";
import client from "../client";

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
        const uglyPassword = await bcrypt.hash(password, 10);
        const createAccount =await client.user.create({
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
        if (existingUser) {
          return {
            ok: false,
            error: "Existing username/email",
          }
        }else{
          return{
            ok: true
          }
        }
    },
  },
};
