# Wowhead Item Roulette

## About

Over the years [Wowhead](http://www.wowhead.com) has cataloged tens of thousands of items.  This is a fun way to randomly look through them.  You never know what you'll find, something that makes you nostalgic, curious, or perhaps even inspired!

## Prerequisites

* Python 3.8
* Poetry
* Docker

## Install

### From Source

* Clone from Github

```
git clone git@github.com:bstoots/wowhead-item-roulette.git
cd wowhead-item-roulette
```

* Install dependencies via Poetry

```
poetry install
```

## Usage

* Build the Docker image

```
./wowhead_item_roulette/scripts/docker-build
```

* Start the Docker container

```
./wowhead_item_roulette/scripts/docker-start
```

* When you're finish stop and remove the Docker container

```
./wowhead_item_roulette/scripts/docker-stop
./wowhead_item_roulette/scripts/docker-remove
```

* Open a browser and navigate to: http://localhost
