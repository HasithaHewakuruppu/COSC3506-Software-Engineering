import styles from '../../styles/DashBoard.module.css';
import Calendar from '../../components/calendar';

export default function Dashboard() {
    return (
        <>
            <nav className={styles.navbar}>
                <h1>The Navbar goes here</h1>
            </nav>
            
            <div className={styles.container}>
                <div className={styles.left}>
                    <h2>List could go here</h2>
                </div>
                <div className={styles.right}>
                    <div className={`${styles.top} ${styles.fullHeight}`}>
                        <Calendar />  
                    </div>
                    <div className={`${styles.bottom} ${styles.fullHeight}`}>
                        <h2>Pie Chart could go here</h2>
                    </div>
                </div>
            </div>
        </>
    );
}
