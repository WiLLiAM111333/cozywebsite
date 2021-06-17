export const ProfileCard = ({ user }) => (
  <div className="profile-card-wrapper">
    <div className="profile-card-header">
      <img src={user.avatarURL} alt={user.avatarURL} className="profile-card-pfp" />
      <span className="profile-card-tag">{user.tag}</span>
      <span class="profile-card-id">{user.id}</span>
    </div>
  </div>
);
