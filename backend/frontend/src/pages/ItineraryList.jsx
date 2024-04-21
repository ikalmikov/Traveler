import React, { useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const ItineraryList = () => {
  useEffect(() => {
    getItineraries();
  }, []);

  let itineraries = [];
  // itineraries = [1,2];
//     {
//         "id": 2,
//         "events": [
//             {
//                 "id": 2,
//                 "title": "Trip to Newee York",
//                 "place": "NYC",
//                 "date": "2024-04-01",
//                 "start_time": "11:00:00",
//                 "end_time": "12:00:00",
//                 "itinerary": 2
//             },
//             {
//                 "id": 3,
//                 "title": "NYC",
//                 "place": "NYC",
//                 "date": "2024-04-01",
//                 "start_time": "11:00:00",
//                 "end_time": "12:00:00",
//                 "itinerary": 2
//             }
//         ],
//         "title": "Tript to NYC",
//         "location": "NYC",
//         "start_date": "2024-01-01",
//         "end_date": "2024-01-05",
//         "created": "2024-04-15T05:56:02.683322Z",
//         "user": 1
//     },
//     {
//         "id": 3,
//         "events": [],
//         "title": "NYC",
//         "location": "NYC",
//         "start_date": "2024-01-01",
//         "end_date": "2024-01-05",
//         "created": "2024-04-16T16:25:34.353168Z",
//         "user": 1
//     },
//     {
//         "id": 4,
//         "events": [],
//         "title": "NYC",
//         "location": "NYC",
//         "start_date": "2024-01-01",
//         "end_date": "2024-01-05",
//         "created": "2024-04-16T17:36:45.067363Z",
//         "user": 1
//     }
// ];

  const getItineraries = async () => {
		try {
      const response = await api.get('api/itineraries/');
      console.log(response.data);
			if(response.status == 200){
        itineraries = response.data;
			}
    } catch (err) {
      console.log(err);
    };
	};

  return (
    <div>
      <h1>My Itineraries</h1>
      <ul>
        {itineraries.map(it =>(
          <li key = {it.id}>
            {it.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItineraryList;