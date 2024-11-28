import { faComments, faVideo, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState } from "react";
import Swal from "sweetalert2";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ChatHistory from './ChatHistory';

function MentorBookings() {
  const [booking, setBookings] = useState({});
  const [show, setShow] = useState(false);
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSlotModalClose = () => setShowSlotModal(false);
  const handleSlotModalShow = () => {
    setSelectedDate("");
    setFromTime("");
    setToTime("");
    setTimeSlots([]);
    setShowSlotModal(true);
  };

  const isTimeSlotConflict = (newFrom, newTo) => {
    return timeSlots.some((slot) => {
      const [existingFrom, existingTo] = slot.split(" - ");
      return (newFrom < existingTo && newTo > existingFrom);
    });
  };

  const addTimeSlot = () => {
    const currentDate = new Date();
    const selectedDateTime = new Date(`${selectedDate}T${fromTime}`);
    const selectedEndTime = new Date(`${selectedDate}T${toTime}`);

    if (!selectedDate) {
      Swal.fire("Error", "Please select a date.", "error");
      return;
    }

    if (!fromTime || !toTime) {
      Swal.fire("Error", "Please select both From and To times.", "error");
      return;
    }

    if (fromTime >= toTime) {
      Swal.fire("Error", "From Time must be earlier than To Time.", "error");
      return;
    }

    if (selectedDateTime < currentDate) {
      Swal.fire("Error", "Please select a future date and time.", "error");
      return;
    }

    if (isTimeSlotConflict(fromTime, toTime)) {
      Swal.fire("Error", "This time slot overlaps with an existing slot.", "error");
      return;
    }

    const newSlot = `${fromTime} - ${toTime}`;
    setTimeSlots([...timeSlots, newSlot]);
    setFromTime("");
    setToTime("");
  };

  const removeTimeSlot = (slot) => {
    setTimeSlots(timeSlots.filter((timeSlot) => timeSlot !== slot));
  };

  const handleSlotSubmit = () => {
    if (selectedDate && timeSlots.length > 0) {
      console.log("Selected Date:", selectedDate);
      console.log("Time Slots:", timeSlots);

      Swal.fire("Slots Added!", "Your availability has been saved.", "success");
      handleSlotModalClose();
    } else {
      Swal.fire("Error", "Please select a date and at least one time slot.", "error");
    }
  };

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  return (
    <>
      <div
        className="d-flex flex-column my-5 p-4 shadow-lg rounded-5 w-100"
        style={{ backgroundColor: "#ea54f566", height: "975px" }}
      >
        <div className="my-3 d-flex">
          <h3 className="text-black fw-bold">Bookings</h3>
          <div className="ms-auto d-flex justify-content-between align-items-center">
            <button
              className="btn btn-outline-info rounded-5 p-2 me-2"
              onClick={handleShow}
            >
              <FontAwesomeIcon icon={faComments} className="fw-bold fs-3" />
            </button>
            <button
              className="btn btn-outline-warning rounded-5 p-2"
              onClick={handleSlotModalShow}
            >
              Add Slots
            </button>
          </div>
        </div>

        {booking.length > 0 ? (
          <div className="mt-4">
            <div
              className="d-flex shadow rounded-4 p-4 flex-column"
              style={{ backgroundColor: "#8e39f766" }}
            >
              <div>
                <h4 className="text-black">Date</h4>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <button className="custom-cr p-2 px-5 rounded-4 m shadow">
                  View
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <h4 className="text-center text-black">
              No Bookings yet{" "}
              <FontAwesomeIcon icon={faSpinner} spinPulse className="ms-3" />
            </h4>
          </div>
        )}
      </div>

      <Offcanvas show={show} onHide={handleClose} style={{ zIndex: '2500', backgroundColor: '#363535' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold">Chat History</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ChatHistory />
        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={showSlotModal} onHide={handleSlotModalClose} centered style={{zIndex:"2500"}}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2 className="text-black fw-bold">Select Date and Time Slots</h2>
            <p className="text-black">Add your time for 1 to 1 session</p>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                min={today} // Disable past dates
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFromTime">
              <Form.Label>From Time</Form.Label>
              <Form.Control
                type="time"
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formToTime">
              <Form.Label>To Time</Form.Label>
              <Form.Control
                type="time"
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
              />
              <Button variant="outline-primary" onClick={addTimeSlot} className="mt-2">
                Add Slot
              </Button>
            </Form.Group>

            <div style={{ maxHeight: "150px", overflowY: "auto" }}>
              <ul className="list-group mt-3">
                {timeSlots.map((slot, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {slot}
                    <Button variant="outline-danger" size="sm" onClick={() => removeTimeSlot(slot)}>
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSlotModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSlotSubmit}>
            Save Slots
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MentorBookings;
