import React from 'react' 
import { Link } from 'react-router-dom'; 

function Nav() {
    return (
      <div className="navigator">
        <nav>
            <h3>Clonagram</h3> 
            <ul className='navList'>
                <Link to="/">
                    <li><span class="material-symbols-outlined">android_google_home</span></li>
                </Link>
                <Link to='/upload'>
                    <li><span class="material-symbols-outlined">add_a_photo</span></li>
                </Link>
                <Link to='/shop'>
                    <li><span class="material-symbols-outlined">logout</span></li>
                </Link>
                
            </ul>
        </nav>
      </div>
    );
  }

export default Nav;