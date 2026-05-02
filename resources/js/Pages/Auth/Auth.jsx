import '@/..css/auth.css'
export default function Auth() {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="container d-flex flex-column align-items-center mt-5">
            {/* ... زر التبديل العلوي يظل كما هو ... */}

            <div className={`card-3d-wrap ${isFlipped ? 'is-flipped' : ''}`}>
                <div className="card-3d-wrapper">
                    
                    {/* الوجه الأمامي: نمرر دالة تجعل isFlipped كاذبة للعودة للوجين */}
                    <div className="card-front">
                        <Login onToggle={() => setIsFlipped(true)} />
                    </div>

                    {/* الوجه الخلفي: نمرر دالة تجعل isFlipped حقيقية للانتقال للريجيستر */}
                    <div className="card-back">
                        <Register onToggle={() => setIsFlipped(false)} />
                    </div>

                </div>
            </div>
        </div>
    );
}