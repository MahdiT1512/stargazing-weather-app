import React from "react";
import './EventsPage.css'; 

const EventCard = ({title, date, location , description, img }) => {
    return (
        <div className="event-card">
            <img className="event-image" src={img} alt={`${title} event`} />
            <h3 className="event-title">{title}</h3>
            <p className="event-date">{date}</p>
            <p className="event-location">{location}</p>
            <p className="event-description">{description}</p>
        </div>
    );
}
export default EventCard;