# Wowhead Item Roulette

## About

Over the years [Wowhead](http://www.wowhead.com) has cataloged tens of thousands of items.  This is a fun way to randomly look through them.  You never know what you'll find, something that makes you nostalgic, curious, or perhaps even inspired!

## Prerequisites

* PHP 7.0 or newer

## Install

### From Archive

* Download from Github

https://github.com/bstoots/wowhead-item-roulette/releases

* Extract archive

```
# untar or unzip as required
cd wowhead-item-roulette
```

### From Source

* Clone from Github

```
git clone git@github.com:bstoots/wowhead-item-roulette.git
cd wowhead-item-roulette
```

* Install dependencies via Composer

```
composer install
```

## Usage

* Start the [built-in web server](http://php.net/manual/en/features.commandline.webserver.php)

```
# wowhead-item-roulette/

# To run on localhost only:
php -S 127.0.0.1:8000 -t public/

# -- OR --

# To bind all interfaces (useful for mobile testing):
php -S 0.0.0.0:8000 -t public/
```

* Open a browser and navigate to: http://localhost:8000
