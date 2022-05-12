import axios from 'axios';
import { useEffect, useState } from 'react';

const Invitations = ({ user }) => {
  const [invitations, setInvitations] = useState(user.invites);

  useEffect(() => {
    (async () => {
      const invites = await axios.get(`/api/users/${user.id}/invites`);
      setInvitations(invites.data);
    })();
  }, [user]);


  return (
    <div>
      <p>invitations:</p>
      <ul>
        {invitations.map(invite => (
          <li key={invite.id}>{invite.screenName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Invitations;
