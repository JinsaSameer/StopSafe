import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        fullname
        email
        password
        
      }
    }
  }
`;

export const ADD_USER = gql`
mutation Mutation($fullname: String!, $email: String!, $password: String!,$agencyAffiliation: String!,$supervisor:String!,$badgeNumber: String,$phoneNumber: String) {
  addPolice(fullname: $fullname, email: $email, password: $password,agencyAffiliation: $agencyAffiliation,supervisor: $supervisor,badgeNumber:$badgeNumber,phoneNumber:$phoneNumber) {
    token
    profile {
      _id
      fullname
      email
      password
      agencyAffiliation
      supervisor
      phoneNumber

    }
  }
}
`;




