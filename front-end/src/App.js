// import logo from './logo.svg';
// import './App.css';
// import AllRoutes from './AllRoutes/AllRoutes';
// import { BrowserRouter, Link } from 'react-router-dom';
// import ChartBoard from './Components/ChartBoard';
// // import Login from './Login';


// function App() {
//   return (
//     <div className="App">
      
//       <BrowserRouter>
//       {/* <Link to="/">
//       <button>Chart</button></Link>
//      <Link to="/recharts"> <button>Recharts</button></Link>
//      <Link to="/victory">  <button>Victory</button></Link>
//      <Link to="/highcharts"> <button>Highcharts</button></Link> */}
//      {/* <Link to="/echarts">
//       <button>Echarts</button></Link> */}
//     <AllRoutes />
//     </BrowserRouter>
//     </div>
//   );
// }

// export default App;


// import React from 'react';
// import styles from './App.module.css';

// function App() {
//   const data = {
//     steps: 70,
//     water: 52,
//     calories: 85,
//   };

//   const { steps, water, calories } = data;

//   const calculateArc = (percentage, radius) => {
//     const circumference = 2 * Math.PI * radius;
//     const arcLength = (percentage / 100) * circumference;
//     const remainingLength = circumference - arcLength;

//     return {
//       strokeDasharray: `${arcLength} ${remainingLength}`
//     };
//   };

//   return (
//     <div className="App">
//    <div className={styles.progressArc}>
//       <svg viewBox="0 0 36 36" className={styles.svg}>
//         <circle
//           className={styles.backgroundCircle}
//           cx="18"
//           cy="18"
//           r="15.91549431"
//           fill="none"
//         />
//         <circle
//           className={styles.stepsArc}
//           cx="18"
//           cy="18"
//           r="15.91549431"
//           fill="none"
//           style={calculateArc(steps, 15.91549431)}
//         />
//         <circle
//           className={styles.waterArc}
//           cx="18"
//           cy="18"
//           r="13.91549431"
//           fill="none"
//           style={calculateArc(water, 13.91549431)}
//         />
//         <circle
//           className={styles.caloriesArc}
//           cx="18"
//           cy="18"
//           r="11.91549431"
//           fill="none"
//           style={calculateArc(calories, 11.91549431)}
//         />
//         <text x="18" y="20.35" className={styles.percentageText} textAnchor="middle">
//           {water}%
//         </text>
//       </svg>
//       <div className={styles.legend}>
//         <span className={styles.steps}>Steps</span>
//         <span className={styles.water}>Water</span>
//         <span className={styles.calories}>Calories</span>
//       </div>
//     </div>

//     </div>
//   );
// }

// export default App;




import React, { useState, useEffect } from 'react';
import MemberList from './Components/MemberList';
import MemberForm from './Components/MemberForm';
import { getMembers } from './api/memberApi';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(1);

  const loadMembers = async () => {
    const data = await getMembers(page);
    setMembers(data);
  };

  useEffect(() => {
    loadMembers();
  }, [page]);

  return (
    <div className="container mt-4">
      {showForm ? (
        <MemberForm onClose={() => setShowForm(false)} reload={loadMembers} />
      ) : (
        <MemberList
          members={members}
          onAddClick={() => setShowForm(true)}
          onPageChange={setPage}
          reload={loadMembers}
        />
      )}
    </div>
  );
}

export default App;

























