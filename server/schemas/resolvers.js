const { Police } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { trusted } = require('mongoose');

const resolvers = {
    Query: {
        profiles: async () => {
            return Police.find();
          },

          profile: async (parent, { profileId }) => {
            return Police.findOne({ _id: profileId });
          },
        },
    Mutation: {
        login: async (parent, { email, password }) => {
            const profile = await Police.findOne( { email });
            if(!profile) {
                throw new AuthenticationError('Incorrect credentials')
            }
            const correctPassword = await profile.isCorrectPassword(password);
            if(!correctPassword) {
                throw new AuthenticationError('Incorrect credentials')
            }
            const token = signToken(profile);
            return { token, profile };
        },
        addPolice: async (parent, args) => {
            const profile = await Police.create(args);
            const token = signToken(profile);

            return { token, profile };
        },
        addEmail:(parent, { profileId, email }) => {
            return Police.findOneAndUpdate(
                { _id: profileId },
                {
                  $addToSet: { email: email },
                },
                {
                  new: true,
                  runValidators: true,
                }
            );
        },

        addAgencyAffiliation:(parent, { profileId, agencyAffiliation }) => {
          return Police.findOneAndUpdate(
              { _id: profileId },
              {
                $addToSet: { agencyAffiliation: agencyAffiliation },
              },
              {
                new: true,
                runValidators: true,
              }
          );
      },
        
      addSupervisor:(parent, { profileId, supervisor }) => {
        return Police.findOneAndUpdate(
            { _id: profileId },
            {
              $addToSet: { supervisr: supervisor },
            },
            {
              new: true,
              runValidators: true,
            }
        );
    },
              addBadgeNumber:(parent, { profileId, badgeNumber }) => {
                return Police.findOneAndUpdate(
                    { _id: profileId },
                    {
                      $addToSet: { badgeNumber: badgeNumber },
                    },
                    {
                      new: true,
                      runValidators: true,
                    }
                );
              },
               
              addPhoneNumber:(parent, { profileId, phoneNumber }) => {
                return Police.findOneAndUpdate(
                    { _id: profileId },
                    {
                      $addToSet: { phoneNumber : phoneNumber  },
                    },
                    {
                      new: true,
                      runValidators: true,
                    }
                );
              },


              removePolice: async (parent, { profileId }) => {
                return Police.findOneAndDelete({ _id: profileId });
              }, 
                   
              removeEmail: async (parent, { profileId, email }) => {
                return Police.findOneAndUpdate(
                  { _id: profileId },
                  { $pull: { email: email } },
                  { new: true }
                );
              },

              removeAgencyAffiliation: async (parent, { profileId, agencyAffiliation }) => {
                return Police.findOneAndUpdate(
                  { _id: profileId },
                  { $pull: {agencyAffiliation: agencyAffiliation } },
                  { new: true }
                );
              },
              removeSupervisor: async (parent, { profileId, supervisor }) => {
                return Police.findOneAndUpdate(
                  { _id: profileId },
                  { $pull: {supervisor: supervisor } },
                  { new: true }
                );
              },
              removeBadgeNumber: async (parent, { profileId, badgeNumber }) => {
                return Police.findOneAndUpdate(
                  { _id: profileId },
                  { $pull: {badgeNumber: badgeNumber } },
                  { new: true }
                );
              },

              removePhoneNumber: async (parent, { profileId, phoneNumber }) => {
                return Police.findOneAndUpdate(
                  { _id: profileId },
                  { $pull: {phoneNumber: phoneNumber } },
                  { new: true }
                );
              },
        
    },
};

module.exports = resolvers;