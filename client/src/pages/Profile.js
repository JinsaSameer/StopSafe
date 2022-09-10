import React from 'react';
//import ProfileList from '../components/ProfileList';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import {QRCodeCanvas} from 'qrcode.react';



import { QUERY_SINGLE_PROFILE } from '../utils/queries';


const Profile = () => {
  const { profileId } = useParams();
  let baseUrl = window.location.origin;
  const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
    variables: { profileId: profileId },
  });

  const profile = data?.profile || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="flex-row justify-space-between my-4"></div>
      <h2 className="card-header">
        {profile.fullname}'s Details...
        
        </h2>
        <QRCodeCanvas value={`${baseUrl}`}></QRCodeCanvas>

        <div className="card mb-9">
                <h4 className="card-header bg-dark text-light p-7 m-0 ">
                 Name: {profile.fullname} <br />
                  
                  <span className="text-white" style={{ fontSize: '1rem' }}>
                   Email: {profile.email}<br /></span>
                   <span className="text-white" style={{ fontSize: '1rem' }}>
                   Agency Affiliation: {profile.agencyAffiliation}<br /></span>
                   <span className="text-white" style={{ fontSize: '1rem' }}>
                   Supervisor: {profile.supervisor}<br /></span>
                   <span className="text-white" style={{ fontSize: '1rem' }}>
                   BadgeNumber: {profile.badgeNumber}<br /></span>
                   <span className="text-white" style={{ fontSize: '1rem' }}>
                   PhoneNumber: {profile.phoneNumber}<br /></span>
                   <Link className="btn btn-lg btn-light m-2" to="/ticketGenerate">
                Generate Ticket
              </Link>
                    </h4>
               </div>
            </div>  
           
          
        
     
            
          
         
      
  );   
  };  

        
      
  
      
        



export default Profile;
