#!/usr/bin/env python

import urllib2, json, random, sys, os

def prompt():
    recv(raw_input(">>> ").lower())

def post(msg):
    print(msg)

def meme(srch):
    reqUrl = "http://api.pixplorer.co.uk/image?amount=1&size=tb&word=meme"
    if srch:
        memesrch = ""
        while srch:
            memesrch += srch[0] + "+"
            srch = srch[1:]
        memesrch = memesrch[:-1]
        reqUrl += memesrch
    memeUrl = eval(urllib2.urlopen(reqUrl).read())['images'][0]['imageurl']
    return "<a href='" + memeUrl + "'><img src='" + memeUrl + "' style='height: 130px;' /></a>"


def gif(srch):
    if srch:
        gif = eval(urllib2.urlopen("http://api.giphy.com/v1/gifs/search?q=" + srch + "&api_key=dc6zaTOxFJmzC").read())['data'][0]
        gifImg = "https://media.giphy.com/media/" + gif['id'] + "/giphy.gif"
    else:
        gif = eval(urllib2.urlopen("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC").read())['data']
        gifImg = gif['image_original_url']

    gifUrl = gif['url']
    return "<a href='" + gifUrl + "'><img src='" + gifImg + "' style='height: 130px;' /></a>"

def joke():
    return eval(urllib2.urlopen("https://gist.githubusercontent.com/neelusb/559916bf7ff7091a20c818e86534f4cc/raw/917c8baba74f6e3d323e95f14d7b681a0dfae5c3/jokes.json").read())[random.randint(0,7)]["joke"]
def recv(m):
    sessid = ""
    m = m.lower()
    mstr = m
    m = m.split()
    if "joke" in m:
        post(joke())
    elif "jokes" in m:
        post("Sorry, I can only tell one joke at a time. Here it is:")
        post(joke())
    if "meme" in m:
        meme("rnd123RND321rnd123RND321rnd")
    if m[0] == "exit" and len(m) == 1:
        sys.exit(0)
    if "gif" in m:
        if "about" in m:
            while m[0] != "about":
                m = m[1:]
            m = m[1:]
            gifsrch = ""
            while m:
                gifsrch += m[0] + "+"
                m = m[1:]
            gifsrch = gifsrch[:-1]
            post(gif(gifsrch))
        elif "of" in m:
            while m[0] != "of":
                m = m[1:]
            m = m[1:]
            gifsrch = ""
            while m:
                gifsrch += m[0] + "+"
                m = m[1:]
            gifsrch = gifsrch[:-1]
            post(gif(gifsrch))
        else:
            post(gif(False))

    elif "meme" in m:
        if "about" in m:
            while m[0] != "about":
                m = m[1:]
            m = m[1:]
            memesrch = ""
            while m:
                memesrch += m[0] + "+"
                m = m[1:]
            memesrch = memesrch[:-1]
            post(meme(memesrch))
        elif "of" in m:
            while m[0] != "of":
                m = m[1:]
            m = m[1:]
            memesrch = ""
            while m:
                memesrch += m[0] + "+"
                m = m[1:]
            memesrch = memesrch[:-1]
            post(meme(memesrch))
        else:
            post(meme(False))

    elif "yes" in m and os.path.isfile(sessid + "-HOGSbot_search.txt"):
        search = open(sessid + "-HOGSbot_search.txt", "r").read().split()
        searchout = ""
        for word in search:
            searchout += word + "+"
        searchout = searchout[:-1]
        post("<a href='https://www.google.com/search?q=" + searchout + "' target='_blank'>Click Here to Search for it in a new tab!</a>")
        os.remove(sessid + "-HOGSbot_search.txt")

    elif "no" in m and os.path.isfile("HOGSbot_search.txt"):
        post("Okay.")
        os.remove(sessid + "-HOGSbot_search.txt")

    else:
        post("I do not know what you mean. Would you like to search the web for "+ mstr +"?")
        open(sessid + "-HOGSbot_search.txt", "w").write(mstr)

if __name__ == "__main__":
    while 1:
        # try: prompt()
        # except: print; sys.exit(0)
        prompt()
