<!doctype html>
<html lang="en">
  <head>
    <title>Wowhead Roulette</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
    <script>
      var whTooltips = {
        colorLinks: true,
        iconizeLinks: true,
        renameLinks: true,
        iconSize: 'large',
        hide: {
          extra: true,
          sellprice: true
        }
      };
    </script>
    <script src="//wow.zamimg.com/widgets/power.js"></script>
    <script type="text/javascript">
      $(document).ready(function() {
        $("#randomItem").on('click', function() {
          let min = <?=$minItemId?>;
          let max = <?=$maxItemId?>;
          let newItemId = Math.floor(Math.random() * (max - min)) + min;
          let newItemLink = '<a id="itemLink" href="http://<?=$wowheadSubdomain?>.wowhead.com/item=' + newItemId + '" rel="item=' + newItemId + '"></a>';
          let oldItemLink = $("#itemLink").replaceWith(newItemLink);
          $("#itemHistoryRow").prepend('<div class="col-12 col-sm-4">' + oldItemLink[0].outerHTML + '</div>');
          // Dip into the WowheadPower library to refresh links after replacement
          $WowheadPower.refreshLinks();
          return false;
        });
      });
    </script>
  </head>
  <body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand">Wowhead Roulette</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">

          <li class="nav-item">
            <a id="randomItem" class="nav-link">Random</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Subdomain
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="de" >Deutsch</a>
              <a class="dropdown-item" href="www">English</a>
              <a class="dropdown-item" href="ptr">English (PTR)</a>
              <a class="dropdown-item" href="es" >Español</a>
              <a class="dropdown-item" href="fr" >Français</a>
              <a class="dropdown-item" href="it" >Italiano</a>
              <a class="dropdown-item" href="pt" >Português Brasileiro</a>
              <a class="dropdown-item" href="ru" >Русский</a>
              <a class="dropdown-item" href="ko" >한국어</a>
              <a class="dropdown-item" href="cn" >简体中文</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row">
        
        <div class="col mx-auto text-center">
          <div id="itemContainer">
            <a id="itemLink" href="http://<?=$wowheadSubdomain?>.wowhead.com/item=<?=$itemId?>" rel="item=<?=$itemId?>"></a>
          </div>
        </div>

      </div>

      <div class="row">
        <div class="col-12 mx-auto text-center">
          History
        </div>
      </div>

      <div id="itemHistoryRow" class="row"></div>

    </div>
  </body>
</html>
