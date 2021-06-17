import { Menu } from '../components/Menu';
import { ProfileCard } from '../components/Profilecard';

import '../styles/homePage.css';

export const HomePage = () => (
  <>
    <header>
      <Menu 
        routes={[
          {
            path: '/about', 
            label: 'About', 
            page: () => <h2>About Page</h2>
          },
          {
            path: '/dashboard', 
            label: 'Dashboard', 
            page: () => <h2>Dashboard Page</h2> 
          }
        ]} />
    </header>
    <section>
      <ProfileCard 
        user={{
          avatarURL: 'https://cdn.discordapp.com/avatars/107424723050180608/a_f90a19f94f428f45e364af460379e4d3.gif',
          tag: 'WiLLiAM#1337',
          id: '107424723050180608'
        }} />
    </section>
  </>
)
