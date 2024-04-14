import styles from './Feedback.module.scss';
import { TFeedbackProps } from './Feedback.types';

export const Feedback = ({ feedbackData }: TFeedbackProps) => {
    return (
        <div className={styles.wrapper}>
            <div dangerouslySetInnerHTML={{ __html: feedbackData }} />
        </div>
    );
};
