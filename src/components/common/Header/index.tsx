import Link from "next/link";
import style from "./header.module.css";

/**
 * @name header
 * @author 오동주
 * @prop name
 * @desc 헤더 컴포넌트
 * @returns number
 */

const Header = () => {
  return (
    <div className={style.bar}>
      <div className={style.sheet}>
        <Link href="/" className={style.logo}>
          Logo
        </Link>
        <ul className={style.link}>
          <li>
            <Link href="/study">Study Home</Link>
          </li>
          <li>
            <Link href="/">My Study</Link>
          </li>
        </ul>
        <ul className={style.profile}>
          <li>
            <button>알림</button>
          </li>
          <li className={style.profile_img}>
            <button>사진</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
