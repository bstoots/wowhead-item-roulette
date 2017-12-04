<!doctype html>
<html lang="en">
  <head>
    <title>Wowhead Item Roulette</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
    <!-- Custom styling for our application -->
    <link rel="stylesheet" href="/css/style.css">
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
    <!-- Configures Wowhead tooltips, details: http://www.wowhead.com/tooltips -->
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
    <script src="/js/WowheadRoulette.js"></script>
    <script>
      // Initialize via templated data
      $WowheadRoulette.currentSubdomain = '<?=$currentSubdomain?>';
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
          $WowheadRoulette.updateWowheadSubdomain(event.target.value);
          $WowheadPower.refreshLinks();
          // Get a little sneaky and update the URL via replaceState().  We do this so that 
          // subdomain changes are reflected in the URL and also handled properly when users 
          // click the Wowhead Item Roulette or Reset links.
          window.history.replaceState({"wowheadSubdomain": $WowheadRoulette.currentSubdomain}, "", $WowheadRoulette.currentSubdomain);
          event.preventDefault();
        });
        // 
        window.onpopstate = function(event) {
          if (event.state && event.state.wowheadSubdomain) {
            $WowheadRoulette.currentSubdomain = event.state.wowheadSubdomain;
            $WowheadRoulette.updateWowheadSubdomain(event.state.wowheadSubdomain);
            $WowheadPower.refreshLinks();
          }
        };

        // Initialize the initial state from history so we have access to wowheadSubdomain from the beginning
        $WowheadRoulette.updateWowheadSubdomain($WowheadRoulette.currentSubdomain);
        window.history.replaceState({"wowheadSubdomain": $WowheadRoulette.currentSubdomain}, "", $WowheadRoulette.currentSubdomain);
        // Initialize the current item
        $WowheadRoulette.replaceCurrentWowheadLink(
          $WowheadRoulette.randomWowheadLink($WowheadRoulette.currentSubdomain, 'large')
        );
      });
    </script>
  </head>
  <body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a id="randomItem" class="navbar-brand" href="" title="Click for a new item">Wowhead Item Roulette</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Subdomain
            </a>
            <div id="subdomainDropdown" class="dropdown-menu" aria-labelledby="navbarDropdown">
              <?php foreach($allSubdomains as $subdomain => $subdomainName): ?>
              <button class="dropdown-item" type="button" value="<?=$subdomain?>"><?=$subdomainName?></button>
              <?php endforeach ?>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="" onclick="location.reload();">Reset</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 mx-auto text-center">
          <div id="itemContainer">
            <a id="currentItemLink"></a>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 mx-auto text-center">
          <hr class="my-2">
          History
          <hr class="my-2">
        </div>
      </div>
      <div id="itemHistoryRow" class="row"></div>
    </div>
  </body>
</html>
