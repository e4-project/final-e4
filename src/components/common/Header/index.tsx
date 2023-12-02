'use client';
import Link from "next/link";
import style from "./header.module.css";
import { useRef, useEffect } from 'react';

/**
 * @name header
 * @author 오동주
 * @prop name
 * @desc 헤더 컴포넌트
 * @returns number
 */

const Header = () => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  

  useEffect(() => {
  	function handleFocus(e:any) {
      const bell = document.getElementById('bell') as HTMLInputElement;
      const profile = document.getElementById('profile') as HTMLInputElement;
      	if (searchRef.current && bell && profile) {
          if(!searchRef.current.contains(e.target)) {
            bell.checked = false;
            profile.checked = false;
          }
        }
      }
      
      document.addEventListener("mouseup", handleFocus);
      return () => { document.removeEventListener("mouseup", handleFocus); }
  }, [searchRef]);

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
        <div>
          <div className={style.profile_title}>
            <input ref={searchRef} type="checkbox" name="profile" id="bell" className={style.bell_check} />
            <label htmlFor="bell" className={style.bell}>
              <img src="/Frame 59.png" alt="" />
            </label>

            <input type="checkbox" name="profile" id="profile" className={style.profile_check}/>
            <label htmlFor="profile" className={style.profile}>

            </label>
            <ul className={style.bell_menu}>
              <li>알림내용</li>
              <li>알림내용</li>
            </ul>
            <ul className={style.profile_menu}>
              <li className={style.profile_menu_frame}>
                <div className={style.profile_menu_img}></div>
                <ul className={style.profile_menu_sheet}>
                  <li className={style.profile_menu_name}>닉네임</li>
                  <li><Link href="/Studypage">My Study</Link></li>
                  <li>마이페이지</li>
                  <li>내 스터디</li>
                  <li>설정</li>
                  <li>로그아웃/로그인</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
