import { User } from '@prisma/client';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { PrismaClientType } from '../../index';
import { JWT_SIGNATURE } from '../../signature';

interface UserArgsType {
  name: string;
  bio: string;
  credentials: {
    email: string;
    password: string;
  }
};

interface UserPayloadType {
  errors: {
    message: string
  }[];
  token: String | null;
};

export const UserResolvers = {
  userSignUp: async (
    _: any,
    {
      name,
      bio,
      credentials
    }: UserArgsType,
    { prisma }: PrismaClientType
  ): Promise<UserPayloadType> => {
    const { email, password } = credentials;

    const isEmailValid = validator.isEmail(email);

    const isPasswordSecure = validator.isStrongPassword(
      password, 
      { 
        minLength: 5, 
        minLowercase: 1, 
        minUppercase: 1, 
        minNumbers: 1, 
        minSymbols: 1, 
        returnScore: false 
      }
    );

    if(!name || !bio || !isEmailValid || !isPasswordSecure) {
      return {
        errors: [
          {
            message: 'invalid credentials'
          }
        ],
        token: null
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    const userData = {
      data: {
        name,
        email,
        password: hashedPassword
      }
    };

    const newUser = await prisma.user.create(userData);

    const userProfileData = {
      data: {
        bio,
        userId: newUser.id
      }
    };

    await prisma.profile.create(userProfileData);

    const token = JWT.sign(
      { userId: newUser.id },
      JWT_SIGNATURE,
      { expiresIn: 86400 }
    );

    return {
      errors: [],
      token
    };
  },
  userSignIn: async (
    _: any,
    { credentials }: UserArgsType,
    { prisma }: PrismaClientType
  ): Promise<UserPayloadType> => {
    const { email, password } = credentials;

    const existingUser = await prisma.user.findUnique(
      {
        where: { email }
      }
    );

    if(!existingUser) {
      return {
        errors: [
          {
            message: 'invalid credentials'
          }
        ],
        token: null
      };
    }

    const matchedPasswords = await bcrypt.compare(password, existingUser.password);

    if(!matchedPasswords) {
      return {
        errors: [
          {
            message: 'invalid credentials'
          }
        ],
        token: null
      };
    }

    const token = JWT.sign(
      { userId: existingUser.id },
      JWT_SIGNATURE,
      { expiresIn: 86400 }
    );

    return {
      errors: [],
      token
    };
  }
};