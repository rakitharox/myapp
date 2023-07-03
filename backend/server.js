
const express  = require("express");
const mysql = require('mysql2');
const cors = require('cors')
const bodyParser = require('body-parser'); 

const app = express();


app.use(cors({
  origin: ["http://localhost:3000"], //Frontend address with port
  methods:["POST","GET","PUT","DELETE"],
}));


app.use(bodyParser.json());
app.use(express.json());



const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    databse:"kapuwa"

})


app.post('/signup', (req, res) => {
    // const {
    //   firstname,
    //   lastname,
    //   dateOfBirth,
    //   gender,
    //   email,
    //   contactNumber,
    //   occupation,
    //   password,
    // } = req.body;
   
    
    function generateUserId() {
  
        const currentHighestUserId = 'U02';
        // Extract the numeric part of the current highest UserID
        const currentNumber = parseInt(currentHighestUserId.slice(1));
      
        // Generate the next number by incrementing the current number
        const nextNumber = currentNumber + 1;
      
        // Create the new UserID by combining 'U' with the padded next number
        const nextUserId = 'U' + nextNumber.toString().padStart(2, '0');
        return nextUserId;
      }
      const userId = generateUserId();

      const values = [
        userId,
        req.body.firstname,
        req.body.lastname,
        req.body.dateOfBirth,
        req.body.gender,
        req.body.email,
        req.body.contactNumber,
        req.body.occupation,
        req.body.password
      ];


    const sql = "INSERT INTO member_account (`UserID`,`Email`,`Password`,`Gender`,`DateOfBirth`,`Occupation`,`ContactNumber`,`Fname`,`Lname`) VALUES (?)";
    db.query(sql,[values],(err,result)=>{
      if(err)
        return res.json({Error:err})
      return res.json({Status:"Data Added Successfully!!"});
    })

  //  connection.query(
  //   query,
  //   [
  //     userId,
  //     email,
  //     password,
  //     gender,
  //     dateOfBirth,
  //     occupation,
  //     contactNumber,
  //     firstname,
  //     lastname,
  //   ],
  //   (err) => {
  //     if (err) {
  //       console.error(err);
  //       res.status(500).json({ message: 'Failed to register user' });
  //     } else {
  //       res.json({ message: 'User registered successfully' });
  //     }
  //   }
  // );
});

app.get('/card1', (req, res) => {
  const sql = 'SELECT * FROM member_account';
  db.query(sql,(error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).json({ error: 'Error executing MySQL query' });
      return;
    }
    res.json({Result:results});
  });
});


// app.post('/Signup', (req,res) => {
//   const sql = "INSERT INTO member_account (`UserID`,`Email`,`Password`,`Gender`,`DateOfBirth`,`Occupation`,`ContactNumber`,`Fname`,`Lname`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  
//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.password,

//     ]
//     db.query(sql, [values], (err,data) => {
//         if(err) {
//             return res.json("Error");
//         }
//         return res.json(data);
//     })
// })

app.post('/', (req,res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password`= ?";
    
    db.query(sql, [req.body.email, req.body.email], (err,data) => {
        if(err) {
            return res.json("Error");
        }
        if(data.length > 0) {
            return res.json("Success")
        }
        else{
            return res.json("Fail")
        }
    })
})


// const express  = require("express");
// const mysql = require('mysql2');
// const cors = require('cors')
// const bodyParser = require('body-parser'); 

// const app = express();


// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());



// const connection = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"",
//     databse:"kapuwa"

// })


// app.post('/signup', (req, res) => {
//     const {
//       firstname,
//       lastname,
//       dateOfBirth,
//       gender,
//       email,
//       contactNumber,
//       occupation,
//       password,
//     } = req.body;
    
//     function generateUserId() {
  
//         const currentHighestUserId = 'U02';
//         // Extract the numeric part of the current highest UserID
//         const currentNumber = parseInt(currentHighestUserId.slice(1));
      
//         // Generate the next number by incrementing the current number
//         const nextNumber = currentNumber + 1;
      
//         // Create the new UserID by combining 'U' with the padded next number
//         const nextUserId = 'U' + nextNumber.toString().padStart(2, '0');
//         return nextUserId;
//       }

//     const userId = generateUserId();

//     const query = " INSERT INTO member_account (`UserID`,`Email`,`Password`,`Gender`,`DateOfBirth`,`Occupation`,`ContactNumber`,`Fname`,`Lname`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

//    connection.query(
//     query,
//     [
//       userId,
//       email,
//       password,
//       gender,
//       dateOfBirth,
//       occupation,
//       contactNumber,
//       firstname,
//       lastname,
//     ],
//     (err) => {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Failed to register user' });
//       } else {
//         res.json({ message: 'User registered successfully' });
//       }
//     }
//   );
// });

// app.post('/card1', (req, res) => {
//   const query = 'SELECT * FROM member_account';
//   connection.query(query, (error, results) => {
//     if (error) {
//       console.error('Error executing MySQL query: ', error);
//       res.status(500).json({ error: 'Error executing MySQL query' });
//       return;
//     }
//     res.json(results);
//   });
// });


// // app.post('/Signup', (req,res) => {
// //   const sql = "INSERT INTO member_account (`UserID`,`Email`,`Password`,`Gender`,`DateOfBirth`,`Occupation`,`ContactNumber`,`Fname`,`Lname`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  
// //     const values = [
// //         req.body.name,
// //         req.body.email,
// //         req.body.password,

// //     ]
// //     db.query(sql, [values], (err,data) => {
// //         if(err) {
// //             return res.json("Error");
// //         }
// //         return res.json(data);
// //     })
// // })

// app.post('/', (req,res) => {
//     const sql = "SELECT * FROM login WHERE `email` = ? AND `password`= ?";
    
//     db.query(sql, [req.body.email, req.body.email], (err,data) => {
//         if(err) {
//             return res.json("Error");
//         }
//         if(data.length > 0) {
//             return res.json("Success")
//         }
//         else{
//             return res.json("Fail")
//         }
//     })
// })



// app.listen(8081, ()=> {
//     console.log("listening");
// })