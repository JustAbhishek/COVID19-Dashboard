import tweepy
import json
from tweepy import OAuthHandler
from tweepy import Stream
from tweepy.streaming import StreamListener
from textblob import TextBlob 

consumer_key = ''
consumer_secret = ''
access_token = ''
access_secret = ''

auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_secret)

api = tweepy.API(auth)
class MyListener(StreamListener):
    
    def on_data(self, data):
        try:
            all_data = json.loads(data)
            tweet = all_data["text"]
            txtblb = TextBlob(tweet).sentiment
            print(tweet,txtblb.polarity)
            if (txtblb.subjectivity*100 >= 60):
            	output = open("COVID19.txt", "a")
            	output.write(str(txtblb.polarity))
            	output.write('\n')
            	output.close()
            	return True
            
        except BaseException as e:
            print("Error on_data: %s" % str(e))
        return True
    
    def on_error(self, status):
        print(status)
        return True

twitter_stream = Stream(auth, MyListener())
twitter_stream.filter(track=['coronovirus', 'COVID19', 'Lockdown'])
