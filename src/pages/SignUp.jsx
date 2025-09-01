




// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router";
// import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";   /////---firebase / Authentication
// import { db } from "../firebaseConfig/firebaseConfig";   ////--- firestore
// import { setDoc, doc } from "firebase/firestore";
// import { getDatabase, ref, set } from "firebase/database";

// const SignUp = () => {
//   const [showPassword, ] = useState(false);
//   const [showConfirmPassword, ] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, ] = useState(false);

//   ////----ye react input field hay
//   const [firstname, setfirstname] = useState("");
//   const [lastname, setlastname] = useState("");
//   const [Phone, setPhone] = useState("");
//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");
//   const [cpassword, setcpassword] = useState("");

// //////----validation sirf react je lae
//   const [fieldErrors, setFieldErrors] = useState({
//     firstname: "",
//     lastname: "",
//     Phone: "",
//     email: "",
//     password: "",
//     cpassword: ""
//   });
//   const navigate = useNavigate();

//   ///--- ye form field hey validation ki
//   const validateFields = () => {
//     const errors = {
//       firstname: "",
//       lastname: "",
//       Phone: "",
//       email: "",
//       password: "",
//       cpassword: ""
//     };
//     let isValid = true;

//     ///-- ye users ki seperate validation hey
//     if (!firstname) {
//       errors.firstname = "Please enter your first name";
//       isValid = false;
//     }
//     if (!lastname) {
//       errors.lastname = "Please enter your last name";
//       isValid = false;
//     }
//     if (!Phone) {
//       errors.Phone = "Please enter your phone number";
//       isValid = false;
//     } 
//     if (!email) {
//       errors.email = "Please enter your email address";
//       isValid = false;
//     }
//     if (!password) {
//       errors.password = "Please enter a password";
//       isValid = false;
//     } else if (password.length < 6) {
//       errors.password = "Password must be at least 6 characters";
//       isValid = false;
//     }
//     if (!cpassword) {
//       errors.cpassword = "Please confirm your password";
//       isValid = false;
//     } else if (password !== cpassword) {
//       errors.cpassword = "Passwords do not match";
//       isValid = false;
//     }
//     setFieldErrors(errors);
//     return isValid;
//   };

//   ////-- ye function new user acount create ke liye he 
//   ////-- jo Auth aur Firestore dono pe data assign hoga
//   const createAccount = async () => {
//     setError("");
//     setFieldErrors({
//       firstname: "",
//       lastname: "",
//       Phone: "",
//       email: "",
//       password: "",
//       cpassword: ""
//     });
//     if (!validateFields()) {
//       return;
//     }

//     //-- ye Firebase Authentication se email aur password se account create karega
//     const auth = getAuth();
//     const realtimeDb = getDatabase();  ///--- ye realtime database initialize ki hey

//     await createUserWithEmailAndPassword(auth, email, password)
//       .then(async (userCredential) => {
//         const user = userCredential.user;

//         //- ye firestore mein create students ji collection data store karega /  save karega
//         await setDoc(doc(db, "students", user.uid), {
//           firstname,
//           lastname,
//           Phone,
//           email,
//           userid: user.uid,
//         });

//         //-- ye realtime database mein data save hoga
//         await set(ref(realtimeDb, "students/" + user.uid), {
//           firstname,
//           lastname,
//           Phone,
//           email,
//           userid: user.uid,
//         })

//         ////---ye react se form data reset hoga
//         setfirstname("");
//         setlastname("");
//         setPhone("");
//         setemail("");
//         setpassword("");
//         setcpassword("");
//         setError("");
//         alert("Account created successfully  ");  ////--- ye data firestore aur realtime Db mein save hogi
//       })
//       .catch((error) => {
//         setError("bhai sahab email pehle se hi is account per dali hui hey");
//       });
//   };

//   return (
//     <>
//       <Container className="mt-5">
//         <Row className="justify-content-center">
//           <Col md={6} lg={5}>
//             <Card className="shadow">
//               <Card.Body>
//                 <h2 className="text-center mb-4">Sign Up</h2>
//                 {/* {error && <Alert variant="danger">{error}</Alert>} */}

//                 <div>
//                   <Form.Group className="mb-3">
//                     <Form.Label>First Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="firstname"
//                       value={firstname}
//                       onChange={(e) => setfirstname(e.target.value)}
//                       placeholder="Enter your first name"
//                       required
//                       isInvalid={!!fieldErrors.firstname}
//                     />
//                     {fieldErrors.firstname && (
//                       <Form.Control.Feedback type="invalid">
//                         {fieldErrors.firstname}
//                       </Form.Control.Feedback>
//                     )}
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Last Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="lastname"
//                       value={lastname}
//                       onChange={(e) => setlastname(e.target.value)}
//                       placeholder="Enter your last name"
//                       required
//                       isInvalid={!!fieldErrors.lastname}
//                     />
//                     {fieldErrors.lastname && (
//                       <Form.Control.Feedback type="invalid">
//                         {fieldErrors.lastname}
//                       </Form.Control.Feedback>
//                     )}
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Phone</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="Phone"
//                       value={Phone}
//                       onChange={(e) => setPhone(e.target.value)}
//                       placeholder="Enter your Phone number"
//                       required
//                       isInvalid={!!fieldErrors.Phone}
//                     />
//                     {fieldErrors.Phone && (
//                       <Form.Control.Feedback type="invalid">
//                         {fieldErrors.Phone}
//                       </Form.Control.Feedback>
//                     )}
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control
//                       type="email"
//                       name="email"
//                       value={email}
//                       onChange={(e) => setemail(e.target.value)}
//                       placeholder="Enter your email"
//                       required
//                       isInvalid={!!fieldErrors.email}
//                     />
//                     {fieldErrors.email && (
//                       <Form.Control.Feedback type="invalid">
//                         {fieldErrors.email}
//                       </Form.Control.Feedback>
//                     )}
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Password</Form.Label>
//                     <div className="position-relative">
//                       <Form.Control
//                         type={showPassword ? "text" : "password"}
//                         name="password"
//                         value={password}
//                         onChange={(e) => setpassword(e.target.value)}
//                         placeholder="Password must be at least 6 characters"
//                         required
//                         isInvalid={!!fieldErrors.password}
//                       />
//                       {fieldErrors.password && (
//                         <Form.Control.Feedback type="invalid">
//                           {fieldErrors.password}
//                         </Form.Control.Feedback>
//                       )}
//                     </div>
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Confirm Password</Form.Label>
//                     <div className="position-relative">
//                       <Form.Control
//                         type={showConfirmPassword ? "text" : "password"}
//                         name="confirmPassword"
//                         value={cpassword}
//                         onChange={(e) => setcpassword(e.target.value)}
//                         placeholder="Confirm your password"
//                         required
//                         isInvalid={!!fieldErrors.cpassword}
//                       />
//                       {fieldErrors.cpassword && (
//                         <Form.Control.Feedback type="invalid">
//                           {fieldErrors.cpassword}
//                         </Form.Control.Feedback>
//                       )}
//                     </div>
//                   </Form.Group>
//                   <Button
//                     variant="primary"
//                     type="button"
//                     className="w-100 mb-3"
//                     disabled={loading}
//                     onClick={createAccount}
//                   >
//                     {loading ? "Creating Account..." : "Sign Up"}
//                   </Button>
//                 </div>

//                 <div className="text-center">
//                   <p>
//                     Already have an account? <Link to="/signin">Login here</Link>
//                   </p>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default SignUp;






import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebaseConfig/firebaseConfig";   //// Firestore
import { setDoc, doc } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";  //// Realtime DB

const SignUp = () => {
  const [showPassword] = useState(false);
  const [showConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //// React input field
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [Phone, setPhone] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  //// Validation field
  const [fieldErrors, setFieldErrors] = useState({
    firstname: "",
    lastname: "",
    Phone: "",
    email: "",
    password: "",
    cpassword: ""
  });

  const navigate = useNavigate();

  //// Validation function
  const validateFields = () => {
    const errors = {
      firstname: "",
      lastname: "",
      Phone: "",
      email: "",
      password: "",
      cpassword: ""
    };
    let isValid = true;

    if (!firstname) {
      errors.firstname = "Please enter your first name";
      isValid = false;
    }
    if (!lastname) {
      errors.lastname = "Please enter your last name";
      isValid = false;
    }
    if (!Phone) {
      errors.Phone = "Please enter your phone number";
      isValid = false;
    }
    if (!email) {
      errors.email = "Please enter your email address";
      isValid = false;
    }
    if (!password) {
      errors.password = "Please enter a password";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    if (!cpassword) {
      errors.cpassword = "Please confirm your password";
      isValid = false;
    } else if (password !== cpassword) {
      errors.cpassword = "Passwords do not match";
      isValid = false;
    }
    setFieldErrors(errors);
    return isValid;
  };

  //// Create Account Function 
  const createAccount = async () => {
    setError("");
    setLoading(true);
    setFieldErrors({
      firstname: "",
      lastname: "",
      Phone: "",
      email: "",
      password: "",
      cpassword: ""
    });

    if (!validateFields()) {
      setLoading(false);
      return;
    }

    const auth = getAuth();
    const realtimeDb = getDatabase();

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        const userData = {
          firstname,
          lastname,
          Phone,
          email,
          userid: user.uid,
        };

        // Firestore  save
        await setDoc(doc(db, "students", user.uid), userData);

        // Realtime  save
        await set(ref(realtimeDb, "students/" + user.uid), userData);

        // Console  save
        console.log("User Created Successfully:", userData);

        // Reset form
        setfirstname("");
        setlastname("");
        setPhone("");
        setemail("");
        setpassword("");
        setcpassword("");
        setError("");
        alert("Account created successfully! Mubarak ho");
        navigate("/signin");
      })
      .catch((err) => {
        console.error("Error creating account:", err.message);
        setError("Bhai sahab email already registered hai");
        setLoading(false);
      })
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}

              <div>
                {/* First Name */}
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstname}
                    onChange={(e) => setfirstname(e.target.value)}
                    placeholder="Enter your first name"
                    required
                    isInvalid={!!fieldErrors.firstname}
                  />
                  {fieldErrors.firstname && (
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.firstname}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                {/* Last Name */}
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastname}
                    onChange={(e) => setlastname(e.target.value)}
                    placeholder="Enter your last name"
                    required
                    isInvalid={!!fieldErrors.lastname}
                  />
                  {fieldErrors.lastname && (
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.lastname}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                {/* Phone */}
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your Phone number"
                    required
                    isInvalid={!!fieldErrors.Phone}
                  />
                  {fieldErrors.Phone && (
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.Phone}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    isInvalid={!!fieldErrors.email}
                  />
                  {fieldErrors.email && (
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.email}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="Password must be at least 6 characters"
                    required
                    isInvalid={!!fieldErrors.password}
                  />
                  {fieldErrors.password && (
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.password}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                {/* Confirm Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    value={cpassword}
                    onChange={(e) => setcpassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    isInvalid={!!fieldErrors.cpassword}
                  />
                  {fieldErrors.cpassword && (
                    <Form.Control.Feedback type="invalid">
                      {fieldErrors.cpassword}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                {/* Submit Button */}
                <Button
                  variant="primary"
                  type="button"
                  className="w-100 mb-3"
                  disabled={loading}
                  onClick={createAccount}
                >
                  {loading ? "Creating Account..." : "Sign Up"}
                </Button>
              </div>

              <div className="text-center">
                <p>
                  Already have an account? <Link to="/signin">Login here</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;