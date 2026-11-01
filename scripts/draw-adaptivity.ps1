Add-Type -AssemblyName System.Drawing

$width = 1920
$height = 1280
$bmp = New-Object System.Drawing.Bitmap $width, $height
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$g.Clear([System.Drawing.Color]::FromArgb(248, 250, 252))

function Brush([int]$r, [int]$g, [int]$b) {
  return New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb($r, $g, $b))
}
function Pen([int]$r, [int]$gv, [int]$b, [single]$w) {
  $p = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb($r, $gv, $b)), $w
  $p.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $p.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  return $p
}
function Font([single]$size, [string]$style) {
  $fs = [System.Drawing.FontStyle]::Regular
  if ($style -eq 'bold') { $fs = [System.Drawing.FontStyle]::Bold }
  return New-Object System.Drawing.Font 'Segoe UI', $size, $fs
}
function RoundRect($graphics, $pen, $brush, [single]$x, [single]$y, [single]$w, [single]$h, [single]$rad) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $rad * 2
  $path.AddArc($x, $y, $d, $d, 180, 90)
  $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  if ($brush) { $graphics.FillPath($brush, $path) }
  if ($pen) { $graphics.DrawPath($pen, $path) }
  $path.Dispose()
}
function Arrow($graphics, $pen, [single]$x1, [single]$y1, [single]$x2, [single]$y2) {
  $graphics.DrawLine($pen, $x1, $y1, $x2, $y2)
  $ang = [Math]::Atan2($y2 - $y1, $x2 - $x1)
  $len = 14
  $a1 = $ang + 2.6
  $a2 = $ang - 2.6
  $graphics.DrawLine($pen, $x2, $y2, ($x2 + $len * [Math]::Cos($a1)), ($y2 + $len * [Math]::Sin($a1)))
  $graphics.DrawLine($pen, $x2, $y2, ($x2 + $len * [Math]::Cos($a2)), ($y2 + $len * [Math]::Sin($a2)))
}

$ink = Brush 15 23 42
$muted = Brush 71 85 105
$blue = Brush 29 78 216
$white = Brush 255 255 255
$cardPen = Pen 203 213 225 2
$bluePen = Pen 37 99 235 3
$slatePen = Pen 100 116 139 2.5

$g.DrawString('EduPortal  ·  How adaptivity works', (Font 32 bold), $ink, 56, 36)
$g.DrawString('A hidden rating chooses the worksheet, then each answer moves that rating for the next chapter.', (Font 16 bold), $muted, 58, 86)

# Four step cards
$steps = @(
  @{ t = '1  Student rating'; b = "Stored on the profile.`nThe student never sees it.`nThe teacher sees it on the class page.`n`nBeginner   under 1100`nAverage    1100 to 1499`nSmart      1500 and above" },
  @{ t = '2  Chapter bank'; b = "Each Class 6 and Class 8 chapter`nhas 20 Solve topics and`n20 Test questions.`n`nEasy     question rating 1000`nMedium   question rating 1300`nHard     question rating 1600" },
  @{ t = '3  What gets shown'; b = "Lower rating: more topics,`nmore questions, mostly easy.`n`nHigher rating: fewer topics,`nfewer questions, mostly hard.`n`nAbout 7 items at the top end`nand about 18 at the bottom." },
  @{ t = '4  This sitting'; b = "The list is fixed when the`nchapter opens.`n`nHints and test answers update`nthe saved rating immediately.`n`nThe open list does not reshuffle`nuntil the chapter is opened again." }
)
for ($i = 0; $i -lt 4; $i++) {
  $x = 48 + $i * 468
  RoundRect $g $cardPen $white $x 140 440 300 18
  $g.FillRectangle($blue, $x, 140, 8, 300)
  $g.DrawString($steps[$i].t, (Font 18 bold), $blue, ($x + 28), 158)
  $g.DrawString($steps[$i].b, (Font 14 bold), $ink, (New-Object System.Drawing.RectangleF (($x + 28), 198, 390, 220)))
  if ($i -lt 3) {
    Arrow $g $bluePen ($x + 448) 290 ($x + 468) 290
  }
}

$g.DrawString('What the student does on that fixed list', (Font 20 bold), $ink, 56, 468)

$actions = @(
  @{ t = 'Learn'; c = @(37, 99, 235); b = "The student asks a question.`nThe server sends the assignment`ntitle to Gemini.`n`nThe rating does not change.`nThe PDF is not sent yet." },
  @{ t = 'Solve'; c = @(180, 83, 9); b = "Practice topics from the bank.`n`nOne AI hint: score 0, K = 16.`nThe rating drops a little.`nThe same topic is not counted twice." },
  @{ t = 'Test'; c = @(190, 18, 60); b = "10 minutes. Submit, or the timer`nends the paper.`n`nRight: score 1, K = 32. Rating rises.`nWrong or blank: score 0, K = 32.`nThe rating falls." }
)
for ($i = 0; $i -lt 3; $i++) {
  $x = 48 + $i * 624
  $c = $actions[$i].c
  RoundRect $g $cardPen $white $x 516 592 280 18
  $badge = Brush $c[0] $c[1] $c[2]
  RoundRect $g $null $badge ($x + 24) 536 110 36 10
  $g.DrawString($actions[$i].t, (Font 16 bold), $white, ($x + 48), 542)
  $g.DrawString($actions[$i].b, (Font 15 bold), $ink, (New-Object System.Drawing.RectangleF (($x + 28), 590, 540, 190)))
  $badge.Dispose()
}

RoundRect $g (Pen 191 219 254 2) (Brush 239 246 255) 48 830 1824 250 18
$g.DrawString('The update, then the next chapter', (Font 20 bold), $blue, 76, 852)
$g.DrawString('expected  =  1  /  (1 + 10 ^ ((question rating - student rating) / 400))', (Font 18 bold), $ink, 76, 898)
$g.DrawString('new rating  =  old rating  +  K  x  (score - expected)', (Font 18 bold), $ink, 76, 938)
$g.DrawString('Beating a question above the student raises the rating more. Missing a question below the student drops it more.', (Font 15 bold), $muted, 76, 986)
$g.DrawString('The number is written to server/data/ratings.json. The next chapter is chosen from that number. A refresh keeps it.', (Font 15 bold), $muted, 76, 1020)

$out = Join-Path (Split-Path $PSScriptRoot -Parent) 'adaptivity-flow.jpg'
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$g.Dispose()
$bmp.Dispose()
Write-Output $out
