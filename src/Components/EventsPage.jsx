import React from "react";
import EventCard from "./EventCard";
import './EventsPage.css';
import Navbar from './Navbar';
import pinkMoonImg from '../Assets/pinkmoon.jpg';
import meteorShowerImg from '../Assets/MeteorShower.webp';
import etaAquaridImg from '../Assets/etaMeteor.avif';

const events = [
    {
        title: "Micro Pink Moon",
        date: "13-04-2025",
        location: "Brecon Beacons, Wales",
        description: "A stunning full moon at its farthest point from Earth, appearing slightly smaller and with a subtle pinkish tint.",
        img: pinkMoonImg
    },
    {
        title: "Lyrid Meteor Shower",
        date: "22-04-2025",
        location: "Exmoor National Park, England",
        description: "A dazzling meteor shower known for its bright trails, best viewed under Exmoor’s dark skies.",
        img: meteorShowerImg
    },
    {
        title: "Eta Aquarid Meteors",
        date: "05-05-2025",
        location: "Cairngorms National Park, Scotland",
        description: "Fast-moving meteors originating from Halley’s Comet, best seen in the early morning hours.",
        img: etaAquaridImg
    }
];
const EventsPage = () => {
    return (
        <div className="events-page">
            <Navbar />
            <h1>Upcoming Astronomy Events</h1>
            <div className="events-container">
                {events.map((event, index) => (
                    <EventCard 
                        key={index}
                        title={event.title}
                        date={event.date}
                        location={event.location}
                        description={event.description}
                        img={event.img}
                    />
                ))}
            </div>
        </div>
    );
};
export default EventsPage;