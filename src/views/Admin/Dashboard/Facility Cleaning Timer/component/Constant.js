// export const data ={
//   "status": true,
//   "message": "fetched",
//   "data": [
//     {
//       "task": {
//         "_id": "65ce2d15ac4d19f8696dce2f",
//         "assigned_inspector": "65bbb46ab458636f97c19bc3",
//         "assigned_manager": "65a1f6274f6612fbb129692e",
//         "assigned_cleaner": "65bbb3a1b458636f97c19b8b",
//         "assigned_location": "65bbb64e5348e5d010be96ef",
//         "assigned_room": "65ce2b3b5094f58fd238a0ea",
//         "assigned_cleaning_items": "65ce2d15ac4d19f8696dce2b",
//         "planned_time": {
//           "_id": "65ce2d14ac4d19f8696dce29"
//         },
//         "isSubmitted": false,
//         "date_added": "2024-02-15T00:00:00.000Z",
//         "date_approved": null,
//         "tasks": [
//           {
//             "name": "desk",
//             "isDone": false,
//             "image": "empty",
//             "_id": "65ce2b3a5094f58fd238a0e7"
//           },
//           {
//             "name": "bathroom",
//             "isDone": false,
//             "image": "empty",
//             "_id": "65ce2b3a5094f58fd238a0e8"
//           }
//         ],
//         "__v": 0,
//         "task_stage": "release"
//       },
//       "actualTime": {"_id": "65ce3ba4a73a5cabe15b73a7",
//         "task_id": "65ce175902d7ac9c73b8870f",
//         "clean_time": 6400,
//         "preOp_time": 3400,
//         "release_time": 0,
//         "__v": 0}
//     },
//     {
//       "task": {
//         "_id": "65ce2cefac4d19f8696dcdeb",
//         "assigned_inspector": "65bbb46ab458636f97c19bc3",
//         "assigned_manager": "65a1f6274f6612fbb129692e",
//         "assigned_cleaner": "65bbb3a1b458636f97c19b8b",
//         "assigned_location": "65bbb64e5348e5d010be96ef",
//         "assigned_room": "65ce2b335094f58fd238a0b7",
//         "assigned_cleaning_items": "65ce2ceeac4d19f8696dcde7",
//         "planned_time": {
//           "_id": "65ce2ceeac4d19f8696dcde5"
//         },
//         "isSubmitted": false,
//         "date_added": "2024-02-15T00:00:00.000Z",
//         "date_approved": null,
//         "tasks": [
//           {
//             "name": "desk",
//             "isDone": false,
//             "image": "empty",
//             "_id": "65ce2b335094f58fd238a0b4"
//           },
//           {
//             "name": "bathroom",
//             "isDone": false,
//             "image": "empty",
//             "_id": "65ce2b335094f58fd238a0b5"
//           }
//         ],
//         "__v": 0,
//         "task_stage": "clean"
//       },
//       "actualTime": null
//     },
//     {
//       "task": {
//         "_id": "65ce175901d7ac9c73b8870f",
//         "assigned_inspector": "65bbb46ab458636f97c19bc3",
//         "assigned_manager": "65a1f6274f6612fbb129692e",
//         "assigned_cleaner": "65bbb3a1b458636f97c19b8b",
//         "assigned_location": "65bbb64e5348e5d010be96ef",
//         "assigned_room": "65ca3cc735adfaef123b188d",
//         "assigned_cleaning_items": "65ce175801d7ac9c73b8870b",
//         "planned_time": {
//           "_id": "65ce175801d7ac9c73b88709"
//         },
//         "isSubmitted": false,
//         "date_added": "2024-02-15T00:00:00.000Z",
//         "date_approved": null,
//         "tasks": [
//           {
//             "name": "desk",
//             "isDone": false,
//             "image": "empty",
//             "_id": "65ca3cc435adfaef123b188a"
//           },
//           {
//             "name": "bathroom",
//             "isDone": false,
//             "image": "empty",
//             "_id": "65ca3cc435adfaef123b188b"
//           }
//         ],
//         "__v": 0,
//         "task_stage": "preop"
//       },
//       "actualTime": {
//         "_id": "65ce3ba4a73a5cabe15b73a6",
//         "task_id": "65ce175901d7ac9c73b8870f",
//         "clean_time": 6400,
//         "preOp_time": 0,
//         "release_time": 0,
//         "__v": 0
//       }
//     }
//   ]
// }
export const data = {
  status: true,
  message: 'fetched',
  data: [
    {
      task: {
        _id: '65ce2d15ac4d19f8696dce2f',
        assigned_inspector: {
          _id: '65bbb46ab458636f97c19bc3',
          username: 'user inspector',
          email: 'userinspector@yahoo.com',
          address_id: '65bbb46ab458636f97c19bc1',
          phone_number: '09043475495',
          flag: 'ACTIVE',
          __v: 0
        },
        assigned_manager: '65a1f6274f6612fbb129692e',
        assigned_cleaner: {
          _id: '65bbb3a1b458636f97c19b8b',
          username: 'user add',
          email: 'useradd@gmail.com',
          address_id: '65bbb3a1b458636f97c19b89',
          phone_number: '0904374155',
          flag: 'ACTIVE',
          __v: 0
        },
        assigned_location: '65bbb64e5348e5d010be96ef',
        assigned_room: {
          _id: '65ce2b3b5094f58fd238a0ea',
          roomName: 'room planned 4',
          location_id: '65bbb64e5348e5d010be96ef',
          detail: '65ce2b3a5094f58fd238a0e6',
          flag: 'PRESENT',
          __v: 0
        },
        assigned_cleaning_items: '65ce2d15ac4d19f8696dce2b',
        planned_time: {
          _id: '65ce2d14ac4d19f8696dce29',
          clean_time: 3000,
          preOp_time: 2100,
          release_time: 600,
          __v: 0
        },
        isSubmitted: false,
        date_added: '2024-02-15T00:00:00.000Z',
        date_approved: null,
        tasks: [
          {
            name: 'desk',
            isDone: false,
            image: 'empty',
            _id: '65ce2b3a5094f58fd238a0e7'
          },
          {
            name: 'bathroom',
            isDone: false,
            image: 'empty',
            _id: '65ce2b3a5094f58fd238a0e8'
          }
        ],
        __v: 0,
        task_stage: 'clean'
      },
      actualTime: null
    },
    {
      task: {
        _id: '65ce2cefac4d19f8696dcdeb',
        assigned_inspector: {
          _id: '65bbb46ab458636f97c19bc3',
          username: 'user inspector',
          email: 'userinspector@yahoo.com',
          address_id: '65bbb46ab458636f97c19bc1',
          phone_number: '09043475495',
          flag: 'ACTIVE',
          __v: 0
        },
        assigned_manager: '65a1f6274f6612fbb129692e',
        assigned_cleaner: {
          _id: '65bbb3a1b458636f97c19b8b',
          username: 'user add',
          email: 'useradd@gmail.com',
          address_id: '65bbb3a1b458636f97c19b89',
          phone_number: '0904374155',
          flag: 'ACTIVE',
          __v: 0
        },
        assigned_location: '65bbb64e5348e5d010be96ef',
        assigned_room: {
          _id: '65ce2b335094f58fd238a0b7',
          roomName: 'room planned 3',
          location_id: '65bbb64e5348e5d010be96ef',
          detail: '65ce2b335094f58fd238a0b3',
          flag: 'PRESENT',
          __v: 0
        },
        assigned_cleaning_items: '65ce2ceeac4d19f8696dcde7',
        planned_time: {
          _id: '65ce2ceeac4d19f8696dcde5',
          clean_time: 6600,
          preOp_time: 5700,
          release_time: 1800,
          __v: 0
        },
        isSubmitted: false,
        date_added: '2024-02-15T00:00:00.000Z',
        date_approved: null,
        tasks: [
          {
            name: 'desk',
            isDone: false,
            image: 'empty',
            _id: '65ce2b335094f58fd238a0b4'
          },
          {
            name: 'bathroom',
            isDone: false,
            image: 'empty',
            _id: '65ce2b335094f58fd238a0b5'
          }
        ],
        __v: 0,
        task_stage: 'release'
      },
      actualTime: {
        _id: '65ce3ba4a73a5cabe15b73a7',
        task_id: '65ce175902d7ac9c73b8870f',
        clean_time: 6400,
        preOp_time: 3400,
        release_time: 0,
        __v: 0
      }
    },
    {
      task: {
        _id: '65ce175901d7ac9c73b8870f',
        assigned_inspector: {
          _id: '65bbb46ab458636f97c19bc3',
          username: 'user inspector',
          email: 'userinspector@yahoo.com',
          address_id: '65bbb46ab458636f97c19bc1',
          phone_number: '09043475495',
          flag: 'ACTIVE',
          __v: 0
        },
        assigned_manager: '65a1f6274f6612fbb129692e',
        assigned_cleaner: {
          _id: '65bbb3a1b458636f97c19b8b',
          username: 'user add',
          email: 'useradd@gmail.com',
          address_id: '65bbb3a1b458636f97c19b89',
          phone_number: '0904374155',
          flag: 'ACTIVE',
          __v: 0
        },
        assigned_location: '65bbb64e5348e5d010be96ef',
        assigned_room: {
          _id: '65ca3cc735adfaef123b188d',
          roomName: 'Date Testing',
          location_id: '65bbb64e5348e5d010be96ef',
          detail: '65ca3cc435adfaef123b1889',
          flag: 'PRESENT',
          __v: 0
        },
        assigned_cleaning_items: '65ce175801d7ac9c73b8870b',
        planned_time: {
          _id: '65ce175801d7ac9c73b88709',
          clean_time: 6300,
          preOp_time: 2700,
          release_time: 600,
          __v: 0
        },
        isSubmitted: false,
        date_added: '2024-02-15T00:00:00.000Z',
        date_approved: null,
        tasks: [
          {
            name: 'desk',
            isDone: false,
            image: 'empty',
            _id: '65ca3cc435adfaef123b188a'
          },
          {
            name: 'bathroom',
            isDone: false,
            image: 'empty',
            _id: '65ca3cc435adfaef123b188b'
          }
        ],
        __v: 0,
        task_stage: 'preop'
      },
      actualTime: {
        _id: '65ce3ba4a73a5cabe15b73a6',
        task_id: '65ce175901d7ac9c73b8870f',
        clean_time: 6400,
        preOp_time: 0,
        release_time: 0,
        __v: 0
      }
    }
  ]
};
