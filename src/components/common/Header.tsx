
import style from '../../styles/header.module.css';

/*
    컴포넌트 명 : 헤더
    작성자 : 오동주
    기능 : 
*/

export default function Header (){
    return(
        <div className={style.bar}>
            <div className={style.sheet}>
              <a href="/" className={style.logo}>Logo</a>
              <ul className={style.link}>
                <li><a href="/">Study Home</a></li>
                <li><a href="/">My Study</a></li>
              </ul>
              <ul className={style.profile}>
                <li><button>알림</button></li>
                <li className={style.profile_img}><button>사진</button></li>
              </ul>
            </div>
        </div>
    )
}