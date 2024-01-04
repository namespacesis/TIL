import React, { useState } from 'react';
import axios from 'axios';
import './SummaryForm.css';

const SummaryForm = () => {
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태를 추적하는 상태 변수

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true); // 요청 시작 시 로딩 상태로 설정
        try {
            const response = await axios.post('http://localhost:8000/summarize/', { text });
            setSummary(response.data['내용 요약']);
        } catch (error) {
            console.error('요약 요청에 실패했습니다:', error);
        } finally {
            setIsLoading(false); // 요청 완료 후 로딩 상태 해제
        }
    };

    return (
        <div className="summary-form">
            <form onSubmit={handleSubmit} className="form">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="여기에 요약할 내용을 입력하세요..."
                    className="input-text"
                />
                <button type="submit" className="submit-button" disabled={isLoading}>
                    {isLoading ? "요약중..." : "요약"}
                </button>
            </form>
            {isLoading ? <p>요약중...</p> : summary && <div className="summary-output"><h3>요약:</h3><p>{summary}</p></div>}
        </div>
    );
};

export default SummaryForm;
