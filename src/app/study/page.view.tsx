"use client";
import React, {useState, useEffect} from 'react';
import style from './study.module.css';
import Button from '@/components/common/Button';
import { studyInfoApi } from '@/axios/fetcher/studyinfo/studyinfo';

const Pageview = () => {
    const [data, setData] = useState<any>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await studyInfoApi();
                console.log(result);
                if (result && result.length > 0) {
                    setData(result[0]);
                } else {
                    console.log('스터디 정보가 없습니다.');
                }
            } catch (error) {
                console.error('스터디 정보를 불러올 수 없습니다.', error);
            }
        };
    
        fetchData();
    }, []);

    return (
        <div className={style.left_container}>
            <div className={style.left_info}>
                <h4>함께 공부할 강의</h4>
                <p>{data?.material}</p>
                <div className={style.study_mini_info}>
                    <p>스터디룸 <Button text="입장하기" /> </p>
                    <p>스터디 기간 <span>{data?.duration}</span></p>
                    <p>스터디 멤버 <span>스터디멤버데이터가져오기</span></p>
                </div>
            </div>
        </div>
    );
};

export default Pageview;