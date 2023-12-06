"use client";
import React, {useState, useEffect, useRef} from 'react';
import style from './study.module.css';
import Button from '@/components/common/Button';
import TextareaAutosize from 'react-textarea-autosize';
/**
 * @name note
 * @author 문태랑
 * @prop name
 * @desc 스터디 진도표 페이지 (홈)
 * @returns number
 */

const Page = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // 수정 상태
  const [inputs, setInputs] = useState([
    { week_input: '', study_content_input: '' },
    { week_input: '', study_content_input: '' },
    { week_input: '', study_content_input: '' },
    { week_input: '', study_content_input: '' },
    { week_input: '', study_content_input: '' },
  ]);
  // 입력값 저장, 기본 5개 보여줌

  const [, setNoteData] = useState<{ title: string; content: string }[]>([]);
  // 노트 데이터 상태 

  const onEditClick = () => {
    setIsEdit(true);
  };
  // 수정 버튼 클릭시 수정 on

  const onSaveClick = () => {
    setIsEdit(false);
  // 저장 버튼 클릭시 수정 off

    const setNote = inputs.map((input, index) => ({
      title: `${index + 1}주차`,
      content: input.study_content_input,
    }));
    // 입력한 값 setNote에 title, content담고

    setNoteData(setNote); // 노트 데이터에 저장
  };

  const onInputChange = (index: number, type: 'week_input' | 'study_content_input', value: string) => {
    const newInputs = [...inputs]; // 기존 입력값 배열에 복사
    newInputs[index][type] = value; // 새 배열에 변경 값 넣고
    setInputs(newInputs); // 상태 업데이트
  };

  const onAddClick = () => {
    setInputs([...inputs, { week_input: '', study_content_input: '' }]);
  };
  // 새로운 입력값 배열에 추가

  const onRemoveClick = (index: number) => {
    const newInputs = [...inputs];
    // 기존 입력값 배열 복사
    newInputs.splice(index, 1);
    // 삭제할 값을 배열에서 제거하고
    setInputs(newInputs);
    // 상태 업데이트
  };

  return (
    <div className={style.progress_container}>
      <div className={style.change_btn}>
        <Button text={isEdit ? '저장' : '수정'} className={style.edit_save_btn} onClick={isEdit ? onSaveClick : onEditClick} />
      </div>
      <div className={style.input_container}>
        {inputs.map((input, index) => (
          <div className={style.input_box} key={index}>
            <input
              className={`${style.week_input} ${isEdit ? style.edit_week_input : ''}`} // 수정 상태일 때 스타일 적용, 아니면 빈 문자열 추가
              type="text"
              placeholder="주차"
              value={isEdit ? input.week_input : input.week_input || ''} // 값이 그대로 있어야하니까 있던거 or 빈칸
              onChange={(e) => onInputChange(index, 'week_input', e.target.value)}
              disabled={!isEdit}
            />
            <TextareaAutosize
              className={`${style.study_content_input} ${isEdit ? style.edit_study_content_input : ''}`}
              placeholder="스터디 내용 입력"
              value={isEdit ? input.study_content_input : input.study_content_input || ''}
              onChange={(e) => onInputChange(index, 'study_content_input', e.target.value)}
              disabled={!isEdit}
            />
            {isEdit && (
              <Button text='삭제' color='#748ffc' onClick={() => onRemoveClick(index)}/>
            )}
          </div>
        ))}
        {isEdit && (
          <Button text='추가' className={style.add_btn} color='#748ffc' onClick={onAddClick}/>
        )}
      </div>
    </div>
  );
}

export default Page;

