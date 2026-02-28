import SimpleForm from './SimpleForm';
import ComplexForm from './ComplexForm';
import ComplexFormWithFields from './ComplexFormWithFields';

import styles from './Forms.module.css';

const FormsPage = () => {
    return (
        <div className={styles.formsPage}>
            <SimpleForm />
            {/*<ComplexForm />*/}
            <ComplexFormWithFields />
        </div>
    )
}
export default FormsPage