import React, {Component} from 'react'
import { Button, Card, NavLink } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Advertisements extends Component{

    constructor(props){
        super(props)
        this.state={
            advertisements:[{
                title: 'KAYAK',
                heading: 'We know these trending destinations are at the top of every Australian\'s bucket list! Here\'s why you can\'t afford to miss out on these travel hotspots',
                imageUrl: 'images/kayak.png',
                imageText: 'Take A Trip Of A Lifetime to these 5 Trending Destinations |KAYAK AU',
                websiteLink: 'https://www.kayak.com.au/'
            },
            {
                title: 'STA Travel',
                heading: 'Looking to book the trip of a lifetime? Weather it\'s Thailand, Africa, or encodeURIComponent, our travel experts can help you find the perfect travel experience',
                imageUrl: 'images/SRA.png',
                imageText: 'Let us help you plan the perfect trip',
                websiteLink: 'https://www.STARTRAVEL.CO.UK/'
            },
            {
                title: 'Traverse City Tourism',
                heading: 'Cherry Blossom season in Traverse City is just around the corner!',
                imageUrl: 'images/traverse.png',
                imageText: 'When and where does it all happen?',
                websiteLink: 'https://www.traversecity.com/'
            },
            {
                title: 'Mezi- Personal Shopping Assistant & Concierge',
                heading: 'Meet Mezi, your expert travel assistant who plans and books all your travel for you.',
                imageUrl: 'images/mezi.png',
                imageText: 'Your Shopping Assistant',
                websiteLink: '#'
            },
            {
                title: 'LiquidAgents Healthcare',
                heading: 'Come back and work with us! Book your next travel nursing assignment and earn a 7-day summer cruise for two.',
                imageUrl: 'images/liquid.png',
                imageText: 'Enjoy a Carribean Vacation On Us',
                websiteLink: 'https://www.liquidagents.com/'
            },
            {
                title: 'Cathay Pacific Airways',
                heading: 'Travel well from Taipei to Hong Kong and enjoy Asian hospitality all the way',
                imageUrl: 'images/cathay.png',
                imageText: 'Explore great fares to Hong Kong',
                websiteLink: 'https://www.cathaypacific.com/'
            },
            {
                title: 'trivago',
                heading: 'No third-wheelers on your romantic holiday, unless you count the pool...',
                imageUrl: 'images/trivago.png',
                imageText: 'Dreamy hotel rooms with their own private pools',
                websiteLink: 'https://www.trivago.com/'
            },
            {
                title: 'Discover The Palm Beaches Florida',
                heading: 'You know where the really great spots are. You\'re a localStorage. We want you to join us.',
                imageUrl: 'images/discover.png',
                imageText: 'Take A Trip Of A Lifetime to these 5 Trending Destinations |KAYAK AU',
                websiteLink: 'https://www.thepalmbeaches.com/'
            },
        ],
            value: Math.floor(Math.random()*8),
        }
    }


    render(){
        return(
            <Card className='adv-main' >
              <Card.Body>
                <Card.Title className="adv-title">{this.state.advertisements[this.state.value].title}</Card.Title>
                <Card.Text className="adv-heading">
                  {this.state.advertisements[this.state.value].heading}
                </Card.Text>
                <Card.Img variant="top" src={this.state.advertisements[this.state.value].imageUrl} />
                <a className='adv-link' target='_blank' href={this.state.advertisements[this.state.value].websiteLink}>{this.state.advertisements[this.state.value].imageText}</a>
              </Card.Body>
            </Card>
        )
    }
}

export default Advertisements