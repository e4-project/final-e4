"use client";
import React, {useState} from 'react';
import style from './study.module.css';

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
    { weekInput: '', studyContentInput: '' },
    { weekInput: '', studyContentInput: '' },
    { weekInput: '', studyContentInput: '' },
    { weekInput: '', studyContentInput: '' },
    { weekInput: '', studyContentInput: '' },
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
      content: input.studyContentInput,
    }));
    // 입력한 값 setNote에 title, content담고

    setNoteData(setNote); // 노트 데이터에 저장
  };

  const onInputChange = (index: number, type: 'weekInput' | 'studyContentInput', value: string) => {
    const newInputs = [...inputs]; // 기존 입력값 배열에 복사
    newInputs[index][type] = value; // 새 배열에 변경 값 넣고
    setInputs(newInputs); // 상태 업데이트
  };

  const onAddClick = () => {
    setInputs([...inputs, { weekInput: '', studyContentInput: '' }]);
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
    <div className={style.progressContainer}>
      <div className={style.changeBtn}>
        <button className={style.editSaveBtn} onClick={isEdit ? onSaveClick : onEditClick}>
          {isEdit ? '저장' : '수정'}
        </button>
      </div>
      <div className={style.inputContainer}>
        {inputs.map((input, index) => (
          <div className={style.inputBox} key={index}>
            <input
              className={`${style.weekInput} ${isEdit ? style.editWeekInput : ''}`} // 수정 상태일 때 스타일 적용, 아니면 빈 문자열 추가
              type="text"
              placeholder="주차"
              value={isEdit ? input.weekInput : input.weekInput || ''} // 값이 그대로 있어야하니까 있던거 or 빈칸
              onChange={(e) => onInputChange(index, 'weekInput', e.target.value)}
            />
            <input
              className={`${style.studyContentInput} ${isEdit ? style.editStudyContentInput : ''}`}
              type="text"
              placeholder="스터디 내용 입력"
              value={isEdit ? input.studyContentInput : input.studyContentInput || ''}
              onChange={(e) => onInputChange(index, 'studyContentInput', e.target.value)}
            />
            {isEdit && (
              <button className={style.removeBtn} onClick={() => onRemoveClick(index)}>
                삭제
              </button>
            )}
          </div>
        ))}
        {isEdit && (
          <button className={style.addBtn} onClick={onAddClick}>
            추가
          </button>
        )}
      </div>
    </div>
  );
}

export default Page;
