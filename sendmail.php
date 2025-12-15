<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';

    header('Content-Type: application/json; charset=utf-8');

    $mail = new PHPMailer(true);

    try {
        // Настройки
        $mail->CharSet = 'UTF-8';
        $mail->isHTML(true);

        // SMTP Gmail
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'jahanger1119@gmail.com';        // 🔴 твой gmail
        $mail->Password   = 'qxlp lwhw jiwd yyik';          // 🔴 пароль приложения
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // От кого
        $mail->setFrom('your@gmail.com', 'Мой сайт');
        // Кому
        $mail->addAddress('jahanger1119@gmail.com');

        // Тема
        $mail->Subject = 'Заявка с сайта';

        // Тело письма
        $body = '<h1>Новая заявка</h1>';

        if (!empty($_POST['name'])) {
            $body .= '<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
        }
        if (!empty($_POST['email'])) {
            $body .= '<p><strong>Email:</strong> '.$_POST['email'].'</p>';
        }
        if (!empty($_POST['phone'])) {
            $body .= '<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
        }
        if (!empty($_POST['message'])) {
            $body .= '<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
        }

        $mail->Body = $body;

        $mail->send();

        echo json_encode(['message' => 'Форма успешно отправлена']);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'message' => 'Ошибка отправки',
            'error' => $mail->ErrorInfo
        ]);
    }

?>