"use client";
import Link from "next/link";
import style from "./header.module.css";
import { useRef, useEffect, useState } from "react";
import LoginModal from "@/components/LoginModal/LoginModal";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
/**
 * @name header
 * @author 오동주
 * @prop name
 * @desc 헤더 컴포넌트
 * @returns number
 */
const Header = () => {
  // 외부 영역 클릭시 드롭다운창 닫기
  const bellRef = useRef<HTMLInputElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const { data: session } = useSession();
  const userName = session?.user?.name;

  useEffect(() => {
    function handleFocus(e: any) {
      const bell = document.getElementById("bell") as HTMLInputElement;
      if (bellRef.current && bell) {
        if (!bellRef.current.contains(e.target)) {
          bell.checked = false;
        }
      }
    }

    document.addEventListener("click", handleFocus);
    return () => {
      document.removeEventListener("click", handleFocus);
    };
  }, [bellRef]);
  //
  useEffect(() => {
    function handleFocus(e: any) {
      const profile = document.getElementById("profile") as HTMLInputElement;
      if (searchRef.current && profile) {
        if (!searchRef.current.contains(e.target)) {
          profile.checked = false;
        }
      }
    }
    document.addEventListener("click", handleFocus);
    return () => {
      document.removeEventListener("click", handleFocus);
    };
  }, [searchRef]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setIsModalOpen(false);
  }, [session]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 알림 개수 보여주는 코드
  const [liCount, setLiCount] = useState(0);
  useEffect(() => {
    const updateLiCount = () => {
      const list = document.querySelectorAll(".push_list");
      setLiCount(list.length);
    };
    updateLiCount();
    const observer = new MutationObserver(updateLiCount);
    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={style.bar}>
      <div className={style.sheet}>
        <Link href="/intropage" className={style.logo}>
          <Image src={"/img/logo.png"} alt="logo" width={55} height={55}/>
        </Link>
        <ul className={style.link}>
          <li>
            <Link href="/study">스터디 홈</Link>
          </li>
          {session ? (
            <li>
              <Link href={`/mystudy/${userName}`}>내 스터디</Link>
            </li>
          ):( 
            <li style={{display:"none"}}> </li>
          )}
        </ul>
        {session ? (
          <div style={{ display: "none" }}></div>
        ) : (
          <div className={style.login} onClick={openModal}>
            로그인
          </div>
        )}
        {session ? (
          <div>
            <div className={style.profile_title}>
              {/*  */}
              <input
                ref={bellRef}
                type="checkbox"
                name="bell"
                id="bell"
                className={style.bell_check}
              />
              <label htmlFor="bell" className={style.bell}>
                {liCount === 0 ? (
                  <span
                    className={style.bell_length}
                    style={{ display: "none" }}
                  >
                    {liCount}
                  </span>
                ) : (
                  <span className={style.bell_length}>{liCount}</span>
                )}
                <img src="/icons/icon_bell.svg" alt="" />
                <ul className={style.bell_menu}>
                  <li className="push_list">알림내용</li>
                  <li className="push_list">알림내용</li>
                </ul>
              </label>
              {/*  */}
              <input
                ref={searchRef}
                type="checkbox"
                name="profile"
                id="profile"
                className={style.profile_check}
              ></input>
              <label htmlFor="profile" className={style.profile}>
                <div className={style.profile_img}>
                  {session && session.user && session.user.image && (
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className={style.profile_image}
                    />
                  )}
                </div>
                <ul className={style.profile_menu}>
                  <li className={style.profile_menu_frame}>
                    <div className={style.profile_menu_img}>
                      {session && session.user && session.user.image && (
                        <img
                          src={session.user.image}
                          alt="Profile"
                          className={style.profile_image}
                        />
                      )}
                    </div>
                    <ul className={style.profile_menu_sheet}>
                      <span className={style.profile_menu_name}>
                        {session && session.user && session.user.name && (
                          <span>{session.user.name}</span>
                        )}
                      </span>
                      <li>
                        <Link href="/mypage">마이페이지</Link>
                      </li>
                      <li
                        onClick={() => {
                          signOut();
                        }}
                      >
                        로그아웃
                      </li>
                    </ul>
                  </li>
                </ul>
              </label>

              {/*  */}
            </div>
          </div>
        ) : null}
      </div>
      {isModalOpen && <LoginModal onClose={closeModal} />}
    </div>
  );
};

export default Header;
