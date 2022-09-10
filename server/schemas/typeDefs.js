const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Police {
        _id:ID
        fullname: String!
        agencyAffiliation: String!
        supervisor:String!
        
        badgeNumber:String
        phoneNumber:String
        
        email:String!
        password:String!
        
    }

    type Auth {
        token: ID!
        profile:Police
    }
    type Query {
     profiles:[Police]!
     profile(profileId: ID!): Police
    }
   
    

    
    type Mutation {
        addPolice(fullname: String!,email: String!, password: String!,agencyAffiliation:String!,supervisor: String!,badgeNumber:String, phoneNumber: String): Auth
        login(email: String!, password: String!): Auth
        loginPolice(email: String!, password: String!): Auth
        
        addEmail(profileId: ID!, email: String!): Police
        addAgencyAffiliation(profileId: ID!, agencyAffiliation: String!): Police
        addSupervisor(profileId: ID!,  supervisor: String!): Police
        
        addBadgeNumber(profileId: ID!,badgeNumber:String!):Police
        addPhoneNumber(profileId: ID!,phoneNumbe:String!):Police
        
        removePolice(profileId:ID!) :Police
        removeEmail(profileId: ID!): Police
        removeAgencyAffiliation(profileId:ID!):Police
        removeSupervisor(profileId:ID!):Police
        removeBadgeNumber(profileId: ID,badgeNumber:String!):Police
        removePhoneNumber(profileId:ID):Police
        
}
`;

module.exports = typeDefs;