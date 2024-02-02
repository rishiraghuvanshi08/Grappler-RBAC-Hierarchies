// import React, { useState, useEffect } from 'react';
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';

// function NotificationComponent() {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const socket = new SockJS('/ws');  // Make sure this matches your WebSocket endpoint
//     const stompClient = Stomp.over(socket);

//     stompClient.connect({}, () => {
//       stompClient.subscribe('/topic/notifications', (notification) => {
//         const newNotification = JSON.parse(notification.body);
//         setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
//       });
//     });

//     return () => {
//       stompClient.disconnect();
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Notifications</h1>
//       <ul>
//         {notifications.map((notification, index) => (
//           <li key={index}>{notification.message}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default NotificationComponent;
