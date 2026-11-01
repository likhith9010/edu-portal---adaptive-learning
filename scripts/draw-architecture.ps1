Add-Type -AssemblyName System.Drawing

$width = 1920
$height = 1400
$bmp = New-Object System.Drawing.Bitmap $width, $height
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$g.Clear([System.Drawing.Color]::FromArgb(248, 250, 252))

function Brush([int]$r, [int]$gv, [int]$b) {
  return New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb($r, $gv, $b))
}
function PenC([int]$r, [int]$gv, [int]$b, [single]$w) {
  $p = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb($r, $gv, $b)), $w
  $p.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $p.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  return $p
}
function UiFont([single]$size, [string]$style) {
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
  $len = 12
  $graphics.DrawLine($pen, $x2, $y2, ($x2 + $len * [Math]::Cos($ang + 2.6)), ($y2 + $len * [Math]::Sin($ang + 2.6)))
  $graphics.DrawLine($pen, $x2, $y2, ($x2 + $len * [Math]::Cos($ang - 2.6)), ($y2 + $len * [Math]::Sin($ang - 2.6)))
}

$ink = Brush 15 23 42
$muted = Brush 71 85 105
$blue = Brush 29 78 216
$white = Brush 255 255 255
$cardPen = PenC 203 213 225 2
$bluePen = PenC 37 99 235 3

$g.DrawString('EduPortal  ·  System architecture and how adaptivity works', (UiFont 30 bold), $ink, 48, 28)
$g.DrawString('One picture of the running app, then the path from an answer to the next chapter.', (UiFont 15 bold), $muted, 50, 74)

$g.DrawString('1   The system', (UiFont 18 bold), $ink, 48, 112)

$boxes = @(
  @{ t = 'Browser'; b = "React app on port 5173.`n`nTeacher: classes, PDF upload,`nand each student's topic profile.`n`nStudent: Learn, Solve, and Test.`nThe student never sees a rating." },
  @{ t = 'API'; b = "Express on port 5000.`nVite sends /api here.`n`nLogin, assignments, PDF files,`noverall Elo, and topic mastery.`n`nThe open chapter list stays fixed`nuntil that chapter is opened again." },
  @{ t = 'Saved on disk'; b = "addedModules.json`nassignment list`n`nserver/pdfs`nuploaded worksheets`n`nratings.json — overall Elo`nmastery.json — topic Elo`nand mastery percent" },
  @{ t = 'Gemini'; b = "Used by Learn only.`nModel: gemini-3.6-flash.`n`nThe request sends the assignment`ntitle and the student's question.`n`nThe PDF is not sent yet.`nLearn does not move any rating." }
)
for ($i = 0; $i -lt 4; $i++) {
  $x = 48 + $i * 468
  RoundRect $g $cardPen $white $x 150 440 340 18
  $g.FillRectangle($blue, $x, 150, 8, 340)
  $g.DrawString($boxes[$i].t, (UiFont 18 bold), $blue, ($x + 28), 166)
  $g.DrawString($boxes[$i].b, (UiFont 14 bold), $ink, (New-Object System.Drawing.RectangleF (($x + 28), 206, 390, 260)))
  if ($i -lt 3) { Arrow $g $bluePen ($x + 448) 320 ($x + 460) 320 }
}

$g.DrawString('2   How one answer changes the next chapter', (UiFont 18 bold), $ink, 48, 516)

$actions = @(
  @{ t = 'Learn'; c = @(37, 99, 235); b = "Question plus the assignment title`ngo to Gemini.`n`nNo Elo change.`nNo mastery change." },
  @{ t = 'Solve hint'; c = @(180, 83, 9); b = "One hint on a topic.`nScore 0, K = 16.`n`nThat topic's Elo drops a little.`nThe same topic is not counted twice." },
  @{ t = 'Test'; c = @(190, 18, 60); b = "10 minutes, then submit or timeout.`n`nRight: score 1, K = 32. Elo rises.`nWrong or blank: score 0, K = 32.`nElo falls." }
)
for ($i = 0; $i -lt 3; $i++) {
  $x = 48 + $i * 624
  $c = $actions[$i].c
  RoundRect $g $cardPen $white $x 560 592 210 18
  $badge = Brush $c[0] $c[1] $c[2]
  RoundRect $g $null $badge ($x + 20) 576 150 32 10
  $g.DrawString($actions[$i].t, (UiFont 14 bold), $white, ($x + 36), 582)
  $g.DrawString($actions[$i].b, (UiFont 14 bold), $ink, (New-Object System.Drawing.RectangleF (($x + 24), 624, 548, 130)))
  $badge.Dispose()
}

RoundRect $g (PenC 191 219 254 2) (Brush 239 246 255) 48 796 1824 270 18
$g.DrawString('Each question belongs to one concept. Concepts point only forward, from earlier classes to later ones.', (UiFont 15 bold), $ink, 72, 816)
$g.DrawString('Whole numbers  →  Fractions  →  Rational numbers  →  Linear equations', (UiFont 16 bold), $blue, 72, 852)
$g.DrawString('Topic Elo:    expected = 1 / (1 + 10 ^ ((question rating - topic Elo) / 400))', (UiFont 16 bold), $ink, 72, 900)
$g.DrawString('new topic Elo = old topic Elo + K x (score - expected). The overall Elo moves by the same rule.', (UiFont 15 bold), $ink, 72, 932)
$g.DrawString('Mastery: a Bayesian trace. A right answer raises the chance the student knows the topic. A wrong answer or a hint lowers it.', (UiFont 15 bold), $ink, 72, 968)
$g.DrawString('The teacher profile walks a weak topic backward. The earliest tested weak concept is repaired first. Untested prerequisites are named before the later chapter is treated as a new gap.', (UiFont 15 bold), $muted, 72, 1008)

RoundRect $g $cardPen $white 48 1090 1824 220 18
$g.FillRectangle($blue, 48, 1090, 8, 220)
$g.DrawString('What the teacher sees, and what is kept', (UiFont 18 bold), $blue, 76, 1110)
$g.DrawString('On the class page, the teacher opens a student. The profile lists every concept up to that class, with topic Elo and mastery only after it has been tested.', (UiFont 15 bold), $ink, 76, 1152)
$g.DrawString('A hint on rational numbers can mark that topic weak and point back to fractions and integers, because those Class 7 concepts have not been tested yet.', (UiFont 15 bold), $ink, 76, 1188)
$g.DrawString('ratings.json and mastery.json keep the numbers after a refresh. Student screens do not show them.', (UiFont 15 bold), $ink, 76, 1224)

$out = Join-Path (Split-Path $PSScriptRoot -Parent) 'system-architecture.jpg'
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$g.Dispose()
$bmp.Dispose()
Write-Output $out
