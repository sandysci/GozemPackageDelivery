class PubSubManager {
    constructor() {
        this.channels = {
            weather: {
                message: '',
                subscribers: []
            },
            sports: {
                message: '',
                subscribers: []
            }
        }
        this.brokerId = setInterval(() => { this.broker() }, 1000);
    }
    subscribe(subscriber, channel) {
        console.log(`subscribing to ${channel}`);
        console.log(`subscribe value ${subscriber}`);
        this.channels[channel].subscribers.push(subscriber);
    }

    removeBroker() {
        clearInterval(this.brokerId);
    }

    publish(publisher, channel, message) {
        this.channels[channel].message = message;
    }

    broker() {
        // console.log("subscriber channel list",this.channels);
        for (const channel in this.channels) {
            if (this.channels.hasOwnProperty(channel)) {
                const channelObj = this.channels[channel];
                if (channelObj.message) {
                    console.log(`found message: ${channelObj.message} in ${channel}`);

                    channelObj.subscribers.forEach(subscriber => {
                        subscriber.send(JSON.stringify({
                            message: channelObj.message
                        }));
                    });

                    channelObj.message = '';
                }
            }
        }
    }
}
module.exports = PubSubManager;