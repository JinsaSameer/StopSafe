import gql from "graphql-tag";

export const QUERY_PROFILES = gql`
query allProfiles { 
     profiles{
      _id
      fullname
      email
      password
      agencyAffiliation
      supervisor
      badgeNumber
      phoneNumber
     
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      fullname
      email
      agencyAffiliation
      supervisor
      badgeNumber
      phoneNumber
    }
  }
`;
