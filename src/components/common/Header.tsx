
import style from '@/styles/header.module.css';

/**
 * @name header
 * @author 오동주
 * @prop name
 * @desc 헤더 컴포넌트
 * @returns number
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