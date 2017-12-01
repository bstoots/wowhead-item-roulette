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
        iconSize: true,
        hide: {
          extra: true,
          sellprice: true
        }
      };
    </script>
    <script src="//wow.zamimg.com/widgets/power.js"></script>
    <script src="js/WowheadRoulette.js"></script>
    <script>

      // Initialize via templated data
      $WowheadRoulette.currentSubdomain = '<?=$wowheadSubdomain?>';
      $WowheadRoulette.minItemId = <?=$minItemId?>;
      $WowheadRoulette.maxItemId = <?=$maxItemId?>;

      $(document).ready(function() {
        // 
        $("#randomItem").on('click', function(event) {
          // Cheat a bit here and use the same subdomain as the currentItemLink.
          let newItemLink = $WowheadRoulette.randomWowheadLink($WowheadRoulette.currentSubdomain, 'large');
          let oldItemLink = $WowheadRoulette.replaceCurrentWowheadLink(newItemLink);
          $WowheadRoulette.moveWowheadLinkToHistory(oldItemLink);
          // Dip into the WowheadPower library to refresh links after replacement
          $WowheadPower.refreshLinks();
          event.preventDefault();
        });
        // 
        $("#subdomainDropdown > button").on('click', function(event) {
          $WowheadRoulette.currentSubdomain = event.target.value;
          $(".itemLink").each(function (key, value) {
            let itemId = $WowheadRoulette.getItemIdFromHref($(value).attr('href'));
            if (value.id == 'currentItemLink') {
              $WowheadRoulette.replaceCurrentWowheadLink(
                $WowheadRoulette.getWowHeadLink($WowheadRoulette.currentSubdomain, itemId, 'large')
              );
            }
            else {
              $(value).replaceWith($WowheadRoulette.getWowHeadLink($WowheadRoulette.currentSubdomain, itemId, 'tiny'));
            }
          });
          // Dip into the WowheadPower library to refresh links after replacement
          $WowheadPower.refreshLinks();
          event.preventDefault();
        });

        // Initialize the current item
        $WowheadRoulette.replaceCurrentWowheadLink(
          $WowheadRoulette.randomWowheadLink($WowheadRoulette.currentSubdomain, 'large')
        );

      });
    </script>
  </head>
  <body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="/">Wowhead Roulette</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">

          <li class="nav-item">
            <a id="randomItem" class="nav-link" href="#">Random</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Subdomain
            </a>
            <div id="subdomainDropdown" class="dropdown-menu" aria-labelledby="navbarDropdown">
              <button class="dropdown-item" type="button" value="de">Deutsch</button>
              <button class="dropdown-item" type="button" value="www">English</button>
              <button class="dropdown-item" type="button" value="ptr">English (PTR)</button>
              <button class="dropdown-item" type="button" value="es">Español</button>
              <button class="dropdown-item" type="button" value="fr">Français</button>
              <button class="dropdown-item" type="button" value="it">Italiano</button>
              <button class="dropdown-item" type="button" value="pt">Português Brasileiro</button>
              <button class="dropdown-item" type="button" value="ru">Русский</button>
              <button class="dropdown-item" type="button" value="ko">한국어</button>
              <button class="dropdown-item" type="button" value="cn">简体中文</button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row">
        
        <div class="col mx-auto text-center">
          <div id="itemContainer">
            <a id="currentItemLink"></a>
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
