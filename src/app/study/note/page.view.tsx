"use client";
import React,{useState, useRef} from 'react';
import style from './note.module.css';
import testDummy from '@/dummy/studydata.json';
import MyEditorComponent from './page.write';
import Button from '@/components/common/Button';

/**
 * @name note
 * @author 문태랑
 * @prop name
 * @desc 공부 노트 페이지
 * @returns number
 */

const Page = () => {
    const [selectWeek, setSelectWeek] = useState(); // 현재 선택된 주차 상태
    const [onEditor, setOnEditor] = useState(false);

    const onWeekChange = (event:any) => {
        setSelectWeek(event.target.value);
    };

    const onWriteButtonClick = () => {
        setOnEditor(true);
    }

    const onSaveButtonClick = () => {
        setOnEditor(false);
    };

    return (
        <div className={style.note_container}>
            <div className={style.note_header}>
                <div className={style.week_write_container}>
                    <label>
                        <select className={style.week_menu} value={selectWeek} onChange={onWeekChange}>
                            <option value="1">1주차</option>
                            <option value="2">2주차</option>
                            <option value="3">3주차</option>
                            <option value="4">4주차</option>
                        </select>
                    </label>
                </div>
                <div>
                {/* ck에디터 추가 */}
                {onEditor ? (
                    <Button text='학습노트 저장하기' className={style.write_btn} onClick={onSaveButtonClick}/>
                ) : (
                    <Button text='학습노트 작성하기' className={style.write_btn} onClick={onWriteButtonClick}/>
                )}
                </div>
                </div>
                    <div className={style.view_note}>
                    {onEditor ? (
                        <MyEditorComponent />
                        ) : (
                        <div className={style.member_note}>
                        {testDummy.member.map((member) => (
                        <p
                            className={style.member_list}
                            key={member.id}
                        >
                            <span style={{ color: '#748ffc' }}>{member.content}</span>의 공부 노트
                        </p>
                    ))}

                </div>
                )}
            </div>
        </div>
    )
}

export default Page;